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

  const actions = [
    {
      type: "view",
      action: () => setUserToFilterBy(actualUser),
    },
    {
      type: "login",
      action: () => console.log("LOGIN"),
    },
    {
      type: "logout",
      action: () => console.log("LOGOUT"),
    },
  ];

  const actualUser = users[1];
  return (
    <Box>
      <UserIcon
        user={actualUser}
        style={{ position: "fixed", top: "1vh", right: "1vw" }}
        actions={actions}
      />
      <PostPage
        actualUser={actualUser}
        userToDisplay={userToFilterBy}
        setUserToDisplay={setUserToFilterBy}
      />
    </Box>
  );
}
