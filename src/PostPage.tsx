import React, { useState } from "react";
import { Post } from "./types/Post";
import { User } from "./types/User";
import PostCard from "./PostCard";
import UserData from "./UserData";
import { GenericIconButton } from "./GenericIconButton";
import RefreshIcon from "@mui/icons-material/Autorenew";
import CommentsPage from "./CommentsPage";
import PostCardForm from "./PostCardForm";
import useActualUser from "./useActualUser";

type PostPageProps = {
  posts: Post[];
  hasMorePosts: boolean;
  fetchPosts: () => void;
  userPosts: Post[];
  hasMoreUserPosts: boolean;
  fetchUserPosts: () => void;
  userToFilterBy?: User;
  setUserToFilterBy: (user: User | undefined) => void;
  updatePost: (post: Post) => void;
  deletePost: (id: string) => void;
};

const PostPage: React.FC<PostPageProps> = (props: PostPageProps) => {
  const userToFilterByIsNotUndefined = props.userToFilterBy !== undefined;
  const displayedPosts = userToFilterByIsNotUndefined
    ? props.userPosts
    : props.posts;
  const hasMore = userToFilterByIsNotUndefined
    ? props.hasMoreUserPosts
    : props.hasMorePosts;
  const fetchMore = userToFilterByIsNotUndefined
    ? props.fetchUserPosts
    : props.fetchPosts;
  const [postToShowComments, setPostToShowComments] = useState<Post | null>(
    null
  );
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);
  const { actualUser } = useActualUser();

  const handlePostEdit = (updatedPost: Post) => {
    setPostToEdit(null);
    props.updatePost(updatedPost);
  };

  return postToShowComments === null && postToEdit === null ? (
    <div style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
      {props.userToFilterBy && (
        <UserData
          userToDisplay={props.userToFilterBy}
          setUserToDisplay={props.setUserToFilterBy}
          isActualUser={
            actualUser !== undefined &&
            actualUser._id === props.userToFilterBy._id
          }
          isSuggestion={false}
        />
      )}
      <>
        {displayedPosts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            setUserToFilterBy={props.setUserToFilterBy}
            showPostComments={() => setPostToShowComments(post)}
            editPost={() => setPostToEdit(post)}
            updatePost={props.updatePost}
            deletePost={props.deletePost}
          />
        ))}
        {hasMore && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <GenericIconButton
              title="load more posts"
              icon={<RefreshIcon />}
              onClick={() => fetchMore()}
              //disabled={isLoading}
            />
          </div>
        )}
      </>
    </div>
  ) : postToShowComments !== null ? (
    <CommentsPage
      post={postToShowComments}
      closeCommentsForm={() => setPostToShowComments(null)}
      isCurrentUserPost={actualUser?._id === postToShowComments.owner}
      updatePost={props.updatePost}
    />
  ) : (
    postToEdit && (
      <PostCardForm post={postToEdit} handlePostUpdate={handlePostEdit} />
    )
  );
};

export default PostPage;
