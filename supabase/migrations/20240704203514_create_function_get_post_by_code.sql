create or replace function get_post_by_code(user_id uuid, user_name text, post_code text)
  returns table (
    id uuid,
    code varchar,
    description varchar,
    title varchar,
    profile_id uuid,
    cover_image_url varchar,
    is_draft boolean,
    created_at timestamp with time zone,
    likes bigint,
    username varchar,
    avatar_url varchar,
    liked boolean
  ) as $func$
  begin
  return query
  select 
    p.*,
    count(likes.id) as likes,
    profile.username as username,
    profile.avatar_url as avatar_url,
    (
      select case when(
        select distinct true from likes where likes.profile_id = user_id and likes.post_id = p.id
      )
      then cast (1 as boolean)
      else cast (0 as boolean) end
    ) as liked
  from post p
  left join likes on likes.post_id = p.id
  left join profiles as profile  on profile.id = p.profile_id
  where p.code = post_code and profile.username = user_name
  group by p.id, profile.username, profile.avatar_url
  order by p.created_at asc
  limit 1;
end $func$ language plpgsql;

-- select * from get_post_by_code('5170b625-9819-42af-8b81-00cdcd15277d', 'jefpires', 'titulo-do-post-a');
