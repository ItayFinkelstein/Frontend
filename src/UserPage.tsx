import Box from "@mui/material/Box";
import PostPage from "./PostPage";
import { User } from "./types/User";
import { Post } from "./types/Post";

interface UserPageProps {
  posts: Post[];
  userToFilterBy: User | undefined;
  setUserToFilterBy: (user: User | undefined) => void;
  hasMorePosts: boolean;
  fetchData: () => void;
}

export default function UserPage({
  userToFilterBy,
  setUserToFilterBy,
  posts,
  hasMorePosts,
  fetchData,
}: UserPageProps) {
  return (
    <Box>
      <PostPage
        posts={posts}
        userToDisplay={userToFilterBy}
        setUserToDisplay={setUserToFilterBy}
        hasMorePosts={hasMorePosts}
        fetchData={fetchData}
      />
    </Box>
  );
}
