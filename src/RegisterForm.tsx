import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Grid, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidatedTextField from "./ValidatedTextField";
import { register } from "./http-connections/authService";

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
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await register(data.name, data.email, data.password);
      navigate("/");
    } catch (error) {
      console.error("There was an error registering or logging in!", error);
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
        name="name"
        label="Name"
        register={registerField}
        error={errors.name}
        autoFocus
      />
      <ValidatedTextField
        name="email"
        label="Email Address"
        register={registerField}
        error={errors.email}
      />
      <ValidatedTextField
        name="password"
        label="Password"
        type="password"
        register={registerField}
        error={errors.password}
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
