import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import useUsers from "./data_hooks/useUsers";
import UserData from "./UserData";
import { User } from "./types/User";

type SuggestionsProps = {
  userToDisplay?: User;
  setUserToDisplay: (user: User | undefined) => void;
};

const Suggestions: React.FC<SuggestionsProps> = (props: SuggestionsProps) => {
  const users = useUsers().users;

  return (
    <Box
      sx={{
        width: "100%",
        padding: 2,
        borderLeft: "1px solid #ddd",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flexShrink: 0 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Suggestions
        </Typography>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
        }}
      >
        <Grid container spacing={2}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} key={user._id}>
              {props.userToDisplay && (
                <UserData
                  userToDisplay={props.userToDisplay}
                  setUserToDisplay={props.setUserToDisplay}
                  isActualUser={false}
                  isSuggestion={true}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Suggestions;
