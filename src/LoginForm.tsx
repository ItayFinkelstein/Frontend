import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Grid, TextField, Link } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 6 characters"),
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
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <Box
      component="form"
      noValidate
      sx={{ mt: 1 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ""}
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        id="password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password ? errors.password.message : ""}
        autoComplete="current-password"
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
