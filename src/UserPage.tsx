import Box from "@mui/material/Box/Box";
import PostPage from "./PostPage";
import { User } from "./types/User";
import { useState } from "react";
import UserIcon from "./UserIcon";
import { users } from "./SharedData";

export default function UserPage() {
  const [userToFilterBy, setUserToFilterBy] = useState<User | undefined>(
    undefined
  );
  const actualUser = users[1];
  return (
    <Box>
      <UserIcon
        user={actualUser}
        onClick={() => setUserToFilterBy(actualUser)}
        style={{ position: "fixed", top: "1vh", right: "1vw" }}
      />
      <PostPage
        actualUser={actualUser}
        userToDisplay={userToFilterBy}
        setUserToDisplay={setUserToFilterBy}
      />
    </Box>
  );
}
