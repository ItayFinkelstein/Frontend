import { Grid, Box, Container } from "@mui/material";
import PostPage from "./PostPage";
import { User } from "./types/User";
import Suggestions from "./Suggestions";

interface UserPageProps {
  userToFilterBy: User | undefined;
  setUserToFilterBy: (user: User | undefined) => void;
}

export default function UserPage({
  userToFilterBy,
  setUserToFilterBy,
}: UserPageProps) {
  return (
    <Container>
      <Box sx={{ flexGrow: 1, marginTop: "2vh" }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={8}>
            <PostPage
              userToDisplay={userToFilterBy}
              setUserToDisplay={setUserToFilterBy}
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
                userToDisplay={userToFilterBy}
                setUserToDisplay={setUserToFilterBy}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
