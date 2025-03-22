import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import useUsers from "./data_hooks/useUsers";
import UserData from "./UserData";
import { User } from "./types/User";

type SuggestionsProps = {
  userToDisplay?: User | undefined;
  setUserToDisplay: (user: User | undefined) => void;
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
        <Grid container spacing={2}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} key={user._id}>
              {!props.userToDisplay && (
                <UserData
                  userToDisplay={user}
                  setUserToDisplay={props.setUserToDisplay}
                  isActualUser={false}
                  isSuggestion={true}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default Suggestions;
