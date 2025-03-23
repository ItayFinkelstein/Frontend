import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Grid, Link, Avatar } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidatedTextField from "../ValidatedTextField";
import { register } from "../http-connections/authService";
import { uploadImage } from "../http-connections/userService";
import avatar from "./assets/avatar.png";
import PhotoIcon from "../PhotoIcon";
import { User } from "../types/User";

const schema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name must be at most 60 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  img: z.instanceof(FileList).optional(),
});

type Inputs = z.infer<typeof schema>;

const RegisterForm: React.FC<{
  setActualUser: (user: User | undefined) => void;
}> = ({ setActualUser }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const {
    register: registerField,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const [img] = watch(["img"]);
  const inputFileRef: { current: HTMLInputElement | null } = { current: null };

  useEffect(() => {
    if (img != null && img[0]) {
      setSelectedImage(img[0]);
    }
  }, [img]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      let avatarUrl = "";
      if (data.img && data.img[0]) {
        const { request } = uploadImage(data.img[0]);
        const response = await request;
        avatarUrl = response.data.url;
      }

      const registeredUser = await register(
        data.name,
        data.email,
        data.password,
        avatarUrl
      );
      setActualUser({
        _id: registeredUser._id,
        email: registeredUser.email,
        name: registeredUser.name,
      });
      navigate("/");
    } catch (error) {
      console.error("There was an error registering or logging in!", error);
    }
  };

  const { ref, ...restRegisterParams } = registerField("img");

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
      <Avatar
        src={selectedImage ? URL.createObjectURL(selectedImage) : avatar}
        alt="Avatar"
        sx={{ width: "10rem", height: "10rem", mb: 2 }}
      />
      <PhotoIcon
        inputFileRef={inputFileRef}
        refCallback={ref}
        restRegisterParams={restRegisterParams}
      />
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
