import React from "react";
import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

interface FormLayoutProps {
  title: string;
  children: React.ReactNode;
}

const FormLayout: React.FC<FormLayoutProps> = ({ title, children }) => {
  return (
    <Container component="main" maxWidth={false} sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid container component="main" sx={{ height: "100%" }}>
        <Grid
          item
          xs={false}
          sm={6}
          md={8}
          sx={{
            backgroundImage: "url(/src/assets/dinning.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={6} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              {title}
            </Typography>
            {children}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FormLayout;
