CREATE TABLE comment(
  id uuid PRIMARY KEY,
  description varchar not null,
  post_id uuid references public.post (id),
  profile_id uuid references public.profiles (id),
  comment_id uuid references public.comment (id),
  created_at timestamp with time zone default current_timestamp not null
)