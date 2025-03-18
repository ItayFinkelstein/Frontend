import Box from "@mui/material/Box";
import PostPage from "./PostPage";
import { User } from "./types/User";

interface UserPageProps {
  actualUser: User | undefined;
  userToFilterBy: User | undefined;
  setUserToFilterBy: (user: User | undefined) => void;
}

export default function UserPage({
  actualUser,
  userToFilterBy,
  setUserToFilterBy,
}: UserPageProps) {
  return (
    <Box>
      <PostPage
        actualUser={actualUser}
        userToDisplay={userToFilterBy}
        setUserToDisplay={setUserToFilterBy}
      />
    </Box>
  );
}
