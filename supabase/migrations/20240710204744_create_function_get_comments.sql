create or replace function get_all_comments(user_id uuid, postid uuid)
  returns table (
    id uuid,
    description varchar,
    post_id uuid,
    profile_id uuid,
    comment_id uuid,
    created_at timestamp with time zone,
    likes bigint,
    username varchar,
    avatar_url varchar,
    liked boolean
  ) as $func$
  begin
  return query
  select 
    com.*,
    count(likes.id) as likes,
    profiles.username as username,
    profiles.avatar_url as avatar_url,
    (
        select case when(
          select distinct true from likes where likes.profile_id = user_id and com.id = likes.comment_id
        )
        then cast (1 as boolean)
        else cast (0 as boolean) end
      ) as liked
  from comment com
  left join likes on likes.comment_id = com.id
  left join profiles on profiles.id = com.profile_id
  where com.post_id = postid
  group by com.id, profiles.username, profiles.avatar_url
  order by com.created_at asc;
end $func$ language plpgsql;