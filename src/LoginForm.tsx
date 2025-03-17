import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Grid, Link } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidatedTextField from "./ValidatedTextField";
import axios from "axios";
import Cookies from "js-cookie";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

type Inputs = z.infer<typeof schema>;

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      //TODO: NEED TO CHANGE TO DO IT ELSWHERE

      const response = await axios.post(
        "http://localhost:3000/auth/login",
        data
      );
      const { accessToken, refreshToken } = response.data;

      // Save the access token as a cookie
      Cookies.set("jwt", accessToken, { expires: 1 / 24 });

      // Store the refresh token in localStorage
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/");
    } catch (error) {
      console.error("There was an error logging in!", error);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{ mt: 1 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ValidatedTextField
        name="email"
        label="Email Address"
        register={register}
        error={errors.email}
        autoFocus={true}
      />
      <ValidatedTextField
        name="password"
        label="Password"
        register={register}
        error={errors.password}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Login
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        startIcon={<GoogleIcon />}
        sx={{ mt: 1, mb: 2 }}
      >
        Login with Google
      </Button>
      <Grid container>
        <Grid item>
          <Link component={RouterLink} to="/register" variant="body2">
            {"Don't have an account? Register"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
