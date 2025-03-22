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
  deletePost: (id: string) => void;
  addPost: (post: Post) => void;
};

const UserPage: React.FC<UserPageProps> = (props: UserPageProps) => {
  return (
    <Box>
      <PostPage
        posts={props.posts}
        hasMorePosts={props.hasMorePosts}
        fetchPosts={props.fetchPosts}
        userPosts={props.userPosts}
        hasMoreUserPosts={props.hasMoreUserPosts}
        fetchUserPosts={props.fetchUserPosts}
        userToFilterBy={props.userToFilterBy}
        setUserToFilterBy={props.setUserToFilterBy}
        updatePost={props.updatePost}
        deletePost={props.deletePost}
        addPost={props.addPost}
      />
    </Box>
  );
};

export default UserPage;
