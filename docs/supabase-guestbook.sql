create extension if not exists pgcrypto;

create table if not exists public.wedding_guestbook (
  id uuid primary key default gen_random_uuid(),
  side text not null check (side in ('groom', 'bride')),
  name text not null check (char_length(name) between 1 and 40),
  message text not null check (char_length(message) between 1 and 500),
  edit_token_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.wedding_guestbook enable row level security;

create index if not exists wedding_guestbook_created_at_idx
  on public.wedding_guestbook (created_at desc);

