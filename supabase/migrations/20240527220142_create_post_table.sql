CREATE TABLE post(
  id uuid PRIMARY KEY NOT NULL,
  code varchar,
  description jsonb,
  title varchar not null,
  profile_id uuid references public.profiles (id),
  cover_image_url varchar,
  is_draft boolean not null,
  created_at timestamp with time zone default current_timestamp
)