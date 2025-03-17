import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Grid, Link } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidatedTextField from "./ValidatedTextField";

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
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
