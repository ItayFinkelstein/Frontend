import { useState } from "react";
import PostCard from "./PostCard";
import { Post } from "./types/Post";
import CommentsPage from "./CommentsPage";
import PostCardForm from "./PostCardForm";
import { User } from "./types/User";
import UserData from "./UserData";
import usePosts from "./data_hooks/usePosts";
import GoogleLoginButton from "./GoogleLoginButton";

type PostPageProps = {
  actualUser?: User;
} & UserToDisplayProps;

export type UserToDisplayProps = {
  userToDisplay?: User | undefined;
  setUserToDisplay: (user: User | undefined) => void;
};
export default function PostPage(props: PostPageProps) {
  const posts = usePosts().posts;

  const [postToShowComments, setPostToShowComments] = useState<Post | null>(
    null
  );
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);

  return postToShowComments === null && postToEdit === null ? (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {props.userToDisplay && (
        <UserData
          userToDisplay={props.userToDisplay}
          setUserToDisplay={props.setUserToDisplay}
          isActualUser={
            props.actualUser !== undefined &&
            props.actualUser._id === props.userToDisplay._id
          }
        />
      )}
      <GoogleLoginButton />
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
              isActualUser={
                props.actualUser !== undefined &&
                post.owner === props.actualUser._id
              }
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
      isCurrentUserPost={props.actualUser?._id === postToShowComments.owner}
      actualUser={props.actualUser?.name}
    />
  ) : (
    postToEdit && (
      <PostCardForm post={postToEdit} hideForm={() => setPostToEdit(null)} />
    )
  );
}
