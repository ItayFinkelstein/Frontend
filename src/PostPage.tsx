import { useState } from "react";
import PostCard from "./PostCard";
import { Post } from "./types/Post";
import CommentsPage from "./CommentsPage";
import PostCardForm from "./PostCardForm";
import { User } from "./types/User";
import UserData from "./UserData";
import usePosts from "./data_hooks/usePosts";
import useActualUser from "./useActualUser";

type PostPageProps = {} & UserToDisplayProps;

export type UserToDisplayProps = {
  userToDisplay?: User | undefined;
  setUserToDisplay: (user: User | undefined) => void;
};

export default function PostPage(props: PostPageProps) {
  const { posts, fetchPosts } = usePosts();
  const { actualUser } = useActualUser();

  const [postToShowComments, setPostToShowComments] = useState<Post | null>(
    null
  );
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);

  const handlePostEdit = () => {
    setPostToEdit(null);
    fetchPosts();
  };

  return postToShowComments === null && postToEdit === null ? (
    <div style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
      {props.userToDisplay && (
        <UserData
          userToDisplay={props.userToDisplay}
          setUserToDisplay={props.setUserToDisplay}
          isActualUser={
            actualUser !== undefined &&
            actualUser._id === props.userToDisplay._id
          }
          isSuggestion={false}
        />
      )}
      {posts
        .filter(
          (post) =>
            props.userToDisplay === undefined ||
            post.owner === props.userToDisplay._id
        )
        .map((post) => {
          return (
            <PostCard
              key={post._id}
              post={post}
              showPostComments={() => setPostToShowComments(post)}
              editPost={() => setPostToEdit(post)}
              setUser={(newUser: User) => props.setUserToDisplay(newUser)}
              isClickableIcon={props.userToDisplay === undefined}
            />
          );
        })}
    </div>
  ) : postToShowComments !== null ? (
    <CommentsPage
      post={postToShowComments}
      closeCommentsForm={() => setPostToShowComments(null)}
      isCurrentUserPost={actualUser?._id === postToShowComments.owner}
    />
  ) : (
    postToEdit && <PostCardForm post={postToEdit} hideForm={handlePostEdit} />
  );
}
