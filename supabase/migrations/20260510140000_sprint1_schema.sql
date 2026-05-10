create extension if not exists "pgcrypto";

create type public.date_type as enum ('lunar', 'solar');
create type public.repeat_type as enum ('yearly', 'monthly', 'once');
create type public.anniversary_category as enum ('birthday', 'memorial', 'anniversary', 'holiday', 'other');
create type public.milestone_mode as enum ('korean_age', 'international_age', 'anniversary_years');
create type public.family_role as enum ('owner', 'member');
create type public.notification_channel as enum ('kakao', 'telegram', 'google_calendar');
create type public.delivery_status as enum ('pending', 'sent', 'failed', 'skipped');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  provider text check (provider in ('kakao', 'google')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.family_groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid not null references public.profiles(id) on delete cascade,
  invite_code text not null unique default encode(gen_random_bytes(8), 'hex'),
  created_at timestamptz not null default now()
);

create table public.family_members (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.family_groups(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.family_role not null default 'member',
  joined_at timestamptz not null default now(),
  unique (group_id, user_id)
);

create table public.anniversaries (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  date_type public.date_type not null,
  month int not null check (month between 1 and 12),
  day int not null check (day between 1 and 31),
  is_leap_month boolean not null default false,
  repeat_type public.repeat_type not null default 'yearly',
  category public.anniversary_category not null default 'other',
  start_year int check (start_year between 1800 and 2200),
  milestone_mode public.milestone_mode,
  is_builtin boolean not null default false,
  builtin_key text,
  is_enabled boolean not null default true,
  default_notification_days int[] not null default array[7, 3, 0],
  notification_time time not null default '09:00',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, builtin_key)
);

create table public.anniversary_shares (
  id uuid primary key default gen_random_uuid(),
  anniversary_id uuid not null references public.anniversaries(id) on delete cascade,
  shared_with_user_id uuid not null references public.profiles(id) on delete cascade,
  can_receive_notifications boolean not null default true,
  created_at timestamptz not null default now(),
  unique (anniversary_id, shared_with_user_id)
);

create table public.memos (
  id uuid primary key default gen_random_uuid(),
  anniversary_id uuid not null references public.anniversaries(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  memo_year int not null check (memo_year between 1800 and 2200),
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (anniversary_id, user_id, memo_year)
);

create table public.notification_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  channel_type public.notification_channel not null,
  is_enabled boolean not null default false,
  config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, channel_type)
);

create table public.notification_deliveries (
  id uuid primary key default gen_random_uuid(),
  anniversary_id uuid not null references public.anniversaries(id) on delete cascade,
  recipient_user_id uuid not null references public.profiles(id) on delete cascade,
  channel_type public.notification_channel not null,
  occurrence_date date not null,
  reminder_days_before int not null,
  status public.delivery_status not null default 'pending',
  error_message text,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  unique (anniversary_id, recipient_user_id, channel_type, occurrence_date, reminder_days_before)
);

create table public.calendar_event_links (
  id uuid primary key default gen_random_uuid(),
  anniversary_id uuid not null references public.anniversaries(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  google_calendar_id text not null default 'primary',
  google_event_id text not null,
  occurrence_year int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (anniversary_id, user_id, google_calendar_id, occurrence_year)
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger touch_profiles_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();
create trigger touch_anniversaries_updated_at
  before update on public.anniversaries
  for each row execute function public.touch_updated_at();
create trigger touch_memos_updated_at
  before update on public.memos
  for each row execute function public.touch_updated_at();
create trigger touch_notification_settings_updated_at
  before update on public.notification_settings
  for each row execute function public.touch_updated_at();
create trigger touch_calendar_event_links_updated_at
  before update on public.calendar_event_links
  for each row execute function public.touch_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, provider)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'nickname'),
    new.raw_app_meta_data ->> 'provider'
  );

  insert into public.anniversaries
    (owner_id, name, date_type, month, day, repeat_type, category, is_builtin, builtin_key, is_enabled)
  values
    (new.id, '설날', 'lunar', 1, 1, 'yearly', 'holiday', true, 'seollal', true),
    (new.id, '정월대보름', 'lunar', 1, 15, 'yearly', 'holiday', true, 'daeboreum', false),
    (new.id, '석가탄신일', 'lunar', 4, 8, 'yearly', 'holiday', true, 'buddhas_birthday', true),
    (new.id, '단오', 'lunar', 5, 5, 'yearly', 'holiday', true, 'dano', false),
    (new.id, '추석', 'lunar', 8, 15, 'yearly', 'holiday', true, 'chuseok', true);

  insert into public.notification_settings (user_id, channel_type, is_enabled)
  values
    (new.id, 'kakao', false),
    (new.id, 'telegram', false),
    (new.id, 'google_calendar', false);

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.family_groups enable row level security;
alter table public.family_members enable row level security;
alter table public.anniversaries enable row level security;
alter table public.anniversary_shares enable row level security;
alter table public.memos enable row level security;
alter table public.notification_settings enable row level security;
alter table public.notification_deliveries enable row level security;
alter table public.calendar_event_links enable row level security;

create policy "profiles are self readable" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles are self writable" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "family groups visible to members" on public.family_groups
  for select using (
    owner_id = auth.uid()
    or exists (
      select 1 from public.family_members
      where group_id = family_groups.id and user_id = auth.uid()
    )
  );
create policy "family groups owned by creator" on public.family_groups
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "family members visible in my groups" on public.family_members
  for select using (
    user_id = auth.uid()
    or exists (
      select 1 from public.family_groups
      where id = family_members.group_id and owner_id = auth.uid()
    )
  );
create policy "family owners manage members" on public.family_members
  for all using (
    exists (
      select 1 from public.family_groups
      where id = family_members.group_id and owner_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.family_groups
      where id = family_members.group_id and owner_id = auth.uid()
    )
  );

create policy "anniversaries visible to owner or shared users" on public.anniversaries
  for select using (
    owner_id = auth.uid()
    or exists (
      select 1 from public.anniversary_shares
      where anniversary_id = anniversaries.id
        and shared_with_user_id = auth.uid()
    )
  );
create policy "anniversaries owned by creator" on public.anniversaries
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "shares visible to owner or recipient" on public.anniversary_shares
  for select using (
    shared_with_user_id = auth.uid()
    or exists (
      select 1 from public.anniversaries
      where id = anniversary_shares.anniversary_id and owner_id = auth.uid()
    )
  );
create policy "owners manage shares" on public.anniversary_shares
  for all using (
    exists (
      select 1 from public.anniversaries
      where id = anniversary_shares.anniversary_id and owner_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.anniversaries
      where id = anniversary_shares.anniversary_id and owner_id = auth.uid()
    )
  );

create policy "memos visible to writer or anniversary owner" on public.memos
  for select using (
    user_id = auth.uid()
    or exists (
      select 1 from public.anniversaries
      where id = memos.anniversary_id and owner_id = auth.uid()
    )
  );
create policy "users manage own memos" on public.memos
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "users manage own notification settings" on public.notification_settings
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "users see own notification deliveries" on public.notification_deliveries
  for select using (recipient_user_id = auth.uid());
create policy "users manage own calendar links" on public.calendar_event_links
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
