import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Grid, TextField, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(20, "Name must be at most 20 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

type Inputs = z.infer<typeof schema>;

const RegisterForm: React.FC = () => {
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
        id="name"
        label="Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ""}
        autoFocus
      />
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
        autoComplete="new-password"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Register
      </Button>
      <Grid container>
        <Grid item>
          <Link component={RouterLink} to="/login" variant="body2">
            {"Already have an account? Login"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterForm;
