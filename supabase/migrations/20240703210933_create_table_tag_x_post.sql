CREATE TABLE tag_x_post(
  id uuid PRIMARY KEY,
  post_id uuid references public.post (id),
  tag_id uuid references public.tag (id),
  created_at timestamp with time zone default current_timestamp not null
)