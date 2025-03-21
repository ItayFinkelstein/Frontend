import React from "react";
import Box from "@mui/material/Box";
import PostPage from "./PostPage";
import { Post } from "./types/Post";
import { User } from "./types/User";

type UserPageProps = {
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

const UserPage: React.FC<UserPageProps> = ({
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
  return (
    <Box>
      <PostPage
        posts={posts}
        hasMorePosts={hasMorePosts}
        fetchPosts={fetchPosts}
        userPosts={userPosts}
        hasMoreUserPosts={hasMoreUserPosts}
        fetchUserPosts={fetchUserPosts}
        userToFilterBy={userToFilterBy}
        setUserToFilterBy={setUserToFilterBy}
        updatePost={updatePost}
      />
    </Box>
  );
};

export default UserPage;
