CREATE TABLE profiles(
  id uuid PRIMARY KEY references auth.users ( id ),
  email varchar not null,
  username varchar not null,
  name varchar not null,
  bio varchar,
  avatar_url varchar not null,
  created_at timestamp with time zone default current_timestamp not null
)