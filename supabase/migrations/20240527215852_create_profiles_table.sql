CREATE TABLE profiles(
  id uuid PRIMARY KEY references auth.users ( id ),
  email varchar not null,
  username varchar,
  bio varchar,
  avatar_url varchar,
  created_at timestamp with time zone default current_timestamp not null
)