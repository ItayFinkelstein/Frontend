import React, { useEffect, useState } from "react";
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
};

const PostPage: React.FC<PostPageProps> = ({
  posts,
  hasMorePosts,
  fetchPosts,
  userPosts,
  hasMoreUserPosts,
  fetchUserPosts,
  userToFilterBy,
  setUserToFilterBy,
  updatePost,
}) => {
  const displayedPosts = !!userToFilterBy ? userPosts : posts;
  const hasMore = !!userToFilterBy ? hasMoreUserPosts : hasMorePosts;
  const fetchMore = !!userToFilterBy ? fetchUserPosts : fetchPosts;
  const [postToShowComments, setPostToShowComments] = useState<Post | null>(
    null
  );
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);
  const { actualUser } = useActualUser();

  useEffect(() => {
    console.log("userToFilterBy changed:", userToFilterBy);
  }, [userToFilterBy]);

  const handlePostEdit = (updatedPost: Post) => {
    setPostToEdit(null);
    updatePost(updatedPost);
  };

  return postToShowComments === null && postToEdit === null ? (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {userToFilterBy && (
        <UserData
          userToDisplay={userToFilterBy}
          setUserToDisplay={setUserToFilterBy}
          isActualUser={
            actualUser !== undefined && actualUser._id === userToFilterBy._id
          }
        />
      )}
      <>
        {displayedPosts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            setUserToFilterBy={setUserToFilterBy}
            showPostComments={() => setPostToShowComments(post)}
            editPost={() => setPostToEdit(post)}
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
    />
  ) : (
    postToEdit && (
      <PostCardForm post={postToEdit} handlePostUpdate={handlePostEdit} />
    )
  );
};

export default PostPage;
