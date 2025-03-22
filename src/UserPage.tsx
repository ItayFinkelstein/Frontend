import { Grid, Box, Container } from "@mui/material";
import React from "react";
import PostPage from "./pages/post/PostPage";
import { Post } from "./types/Post";
import { User } from "./types/User";
import Suggestions from "./Suggestions";
import { SharedProps } from "./App";

type UserPageProps = {
  posts: Post[];
  hasMorePosts: boolean;
  fetchPosts: () => void;
  userPosts: Post[];
  hasMoreUserPosts: boolean;
  fetchUserPosts: () => void;
  userToFilterBy?: User;
  setUserToFilterBy: (user: User | undefined) => void;
} & SharedProps;

const UserPage: React.FC<UserPageProps> = (props: UserPageProps) => {
  return (
    <Container>
      <Box sx={{ flexGrow: 1, marginTop: "2vh" }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={8}>
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
              actualUser={props.actualUser}
              setActualUser={props.setActualUser}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Box
              sx={{
                position: "fixed",
                right: "5%",
                top: "50%",
                transform: "translateY(-50%)",
                width: "25%",
                height: "500px",
                overflowY: "auto",
              }}
            >
              <Suggestions
                userToDisplay={props.userToFilterBy}
                setUserToDisplay={props.setUserToFilterBy}
                actualUser={props.actualUser}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default UserPage;
