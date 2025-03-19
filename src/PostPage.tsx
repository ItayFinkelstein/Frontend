import { useState } from "react";
import PostCard from "./PostCard";
import { Post } from "./types/Post";
import CommentsPage from "./CommentsPage";
import PostCardForm from "./PostCardForm";
import { User } from "./types/User";
import UserData from "./UserData";
import usePosts from "./data_hooks/usePosts";
import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Autorenew";
import useActualUser from "./useActualUser";
import { GenericIconButton } from "./GenericIconButton";

type PostPageProps = {} & UserToDisplayProps;

export type UserToDisplayProps = {
  userToDisplay?: User | undefined;
  setUserToDisplay: (user: User | undefined) => void;
};

export default function PostPage(props: PostPageProps) {
  const { posts, loadNextPage, isLoading, hasMore } = usePosts();
  const { actualUser } = useActualUser();

  const [postToShowComments, setPostToShowComments] = useState<Post | null>(
    null
  );
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);

  const handlePostEdit = () => {
    setPostToEdit(null);
  };

  return postToShowComments === null && postToEdit === null ? (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {props.userToDisplay && (
        <UserData
          userToDisplay={props.userToDisplay}
          setUserToDisplay={props.setUserToDisplay}
          isActualUser={
            actualUser !== undefined &&
            actualUser._id === props.userToDisplay._id
          }
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
      {hasMore && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <GenericIconButton
            title="load more posts"
            icon={<RefreshIcon />}
            onClick={loadNextPage}
            disabled={isLoading}
          />
        </div>
      )}
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
