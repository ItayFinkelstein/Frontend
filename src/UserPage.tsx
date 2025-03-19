import Box from "@mui/material/Box";
import PostPage from "./PostPage";
import { User } from "./types/User";

interface UserPageProps {
  userToFilterBy: User | undefined;
  setUserToFilterBy: (user: User | undefined) => void;
}

export default function UserPage({
  userToFilterBy,
  setUserToFilterBy,
}: UserPageProps) {
  return (
    <Box>
      <PostPage
        userToDisplay={userToFilterBy}
        setUserToDisplay={setUserToFilterBy}
      />
    </Box>
  );
}
