import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import useUsers from "./data_hooks/useUsers";
import UserData from "./UserData";
import { User } from "./types/User";

type SuggestionsProps = {
  userToDisplay?: User | undefined;
  setUserToDisplay: (user: User | undefined) => void;
  actualUser: User | undefined;
};

const Suggestions: React.FC<SuggestionsProps> = (props: SuggestionsProps) => {
  const users = useUsers().users;

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        padding: 2,
        borderRadius: 2,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Suggestions
        </Typography>
      </Box>
      <Box
        sx={{
          overflowY: "auto",
        }}
      >
        {users
          .filter(
            (user) =>
              user._id !== props.actualUser?._id ||
              props.actualUser?._id !== user._id
          )
          .map((user) => (
            <Box key={user._id} sx={{ mb: 2 }}>
              <UserData
                userToDisplay={user!}
                setUserToDisplay={props.setUserToDisplay}
                isActualUser={false}
                isSuggestion={true}
                actualUser={props.actualUser}
              />
            </Box>
          ))}
      </Box>
    </Paper>
  );
};

export default Suggestions;
