import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Grid, Link, Divider, Typography } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidatedTextField from "./ValidatedTextField";
import { login } from "./http-connections/authService";
import GoogleLoginButton from "./GoogleLoginButton";
import useActualUser from "./useActualUser";

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
  const { setActualUser } = useActualUser();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const loggedInUser = await login(data.email, data.password);
      setActualUser({
        _id: loggedInUser._id,
        email: loggedInUser.email,
        name: loggedInUser.name,
      });

      navigate("/");
    } catch (error) {
      console.error("There was an error logging in!", error);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ValidatedTextField
        name="email"
        label="Email Address"
        register={register}
        error={errors.email}
        autoFocus={true}
        fullWidth
      />
      <ValidatedTextField
        name="password"
        label="Password"
        type="password"
        register={register}
        error={errors.password}
        fullWidth
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Login
      </Button>
      <GoogleLoginButton />
      <Box sx={{ display: "flex", alignItems: "center", width: "100%", my: 2 }}>
        <Divider sx={{ flexGrow: 1 }} />
        <Typography variant="body2" sx={{ mx: 2 }}>
          OR
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
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
