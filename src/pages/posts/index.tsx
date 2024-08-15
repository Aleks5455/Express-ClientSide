import { useGetAllPostQuery } from "../../app/services/postsApi"
import { CreatePost } from "../../components/createPost"
import { PostCard } from "../../components/postCard"

export const Posts = () => {
  const { data } = useGetAllPostQuery()

  return (
    <>
      <div className="mb-10 w-full flex">
        <CreatePost />
      </div>
      <div>
        {data && data.length > 0
          ? data.map(
              ({
                content,
                author,
                id,
                authorId,
                comments,
                likes,
                likedByUser,
                createdAt,
              }) => (
                <PostCard
                  key={id}
                  avatarUrl={author.avatarUrl ?? ""}
                  content={content}
                  name={author.name ?? ""}
                  likesCount={likes.length}
                  commentsCount={comments.length}
                  authorId={authorId}
                  id={id}
                  likedByUser={likedByUser}
                  createdAt={createdAt}
                  cardFor="post"
                />
              ),
            )
          : null}
      </div>
    </>
  )
}
