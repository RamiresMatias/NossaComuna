CREATE TABLE tag(
  id uuid PRIMARY KEY,
  description varchar not null,
  created_at timestamp with time zone default current_timestamp not null
)