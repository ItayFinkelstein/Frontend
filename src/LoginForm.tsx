import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Grid, Link, Divider, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidatedTextField from "./ValidatedTextField";
import { login } from "./http-connections/authService";
import GoogleLoginButton from "./GoogleLoginButton";
import { User } from "./types/User";
import Swal from "sweetalert2";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

type Inputs = z.infer<typeof schema>;

type LoginFormProps = {
  setActualUser: (user: User | undefined) => void;
};
const LoginForm: React.FC<LoginFormProps> = ({ setActualUser }) => {
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
      const loggedInUser = await login(data.email, data.password);
      setActualUser({
        _id: loggedInUser._id,
        email: loggedInUser.email,
        name: loggedInUser.name,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "user not found",
        text: "Please check your email and password",
        icon: "error",
      });
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
      <Box sx={{ display: "flex", alignItems: "center", width: "100%", my: 2 }}>
        <Divider sx={{ flexGrow: 1 }} />
        <Typography variant="body2" sx={{ mx: 2 }}>
          OR
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
      <GoogleLoginButton setActualUser={setActualUser} />
      <Grid container sx={{ mt: 2 }}>
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
