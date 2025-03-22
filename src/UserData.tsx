import { Paper, Box, Typography } from "@mui/material";
import UserIcon from "./UserIcon";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ValidatedTextField from "./ValidatedTextField";
import { useState, useEffect, useRef } from "react";
import { GenericIconButton } from "./GenericIconButton";
import userService, { uploadImage } from "./http-connections/userService";
import { User } from "./types/User";
import useUsers from "./data_hooks/useUsers";
import PhotoIcon from "./PhotoIcon";

export interface UserToDisplayProps {
  userToDisplay: User;
  setUserToDisplay: (user: User | undefined) => void;
}

export default function UserData(
  props: Required<UserToDisplayProps> & {
    isActualUser: boolean;
    isSuggestion: boolean;
    setActualUser?: (user: User | undefined) => void;
    actualUser?: User | undefined;
  }
) {
  const [isEditing, setIsEditing] = useState(false);
  const { setUsers } = useUsers();
  const [image, setImage] = useState<File | null>(null);

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const schema = z.object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(20, { message: "Name must be no more than 20 characters" }),
    img: z.instanceof(FileList).optional(),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const img = watch("img");

  useEffect(() => {
    if (img && img[0]) {
      setImage(img[0]);
      console.log(img[0]);
    }
  }, [img]);

  const onSubmit = async (data: any) => {
    let avatarUrl = props.userToDisplay.iconImage;
    if (data.img && data.img[0]) {
      const { request } = uploadImage(data.img[0]);
      const response = await request;
      avatarUrl = response.data.url;
    }

    const updatedUser = {
      ...props.userToDisplay,
      name: data.name,
      iconImage: avatarUrl,
    };
    await userService.update(updatedUser);
    setUsers((users) => {
      return users.map((user) => {
        if (user._id === updatedUser._id) {
          return updatedUser;
        }
        return user;
      });
    });
    props.setActualUser?.(updatedUser);
    if (!props.userToDisplay) {
      reset({
        name: "",
        img: undefined,
      });
      setImage(null);
    }
    setIsEditing(false);
  };

  const { ref, ...restRegisterParams } = register("img");

  return (
    <Paper
      elevation={props.isSuggestion ? 0 : 3}
      sx={{
        padding: "20px",
        display: "flex",
        alignItems: "center",
        gap: props.isSuggestion ? "1rem" : "3rem",
        width: props.isSuggestion ? "95%" : "100%",
        boxShadow: props.isSuggestion
          ? "0px 4px 8px rgba(0, 0, 0, 0.1)"
          : undefined,
        "&:hover": {
          backgroundColor: props.isSuggestion ? "lightyellow" : "",
        },
      }}
      onClick={() => {
        if (props.isSuggestion) {
          props.setUserToDisplay(props.userToDisplay); // Example: Set the user to display
        }
      }}
    >
      <Box sx={{ position: "relative" }}>
        <UserIcon
          iconUrl={
            image ? URL.createObjectURL(image) : props.userToDisplay.iconImage
          }
          user={props.userToDisplay}
          style={{
            width: props.isSuggestion ? "50px" : "150px",
            height: props.isSuggestion ? "50px" : "150px",
          }}
          onClick={() => props.setUserToDisplay(props.userToDisplay)}
        />
        {props.isActualUser && isEditing && (
          <PhotoIcon
            inputFileRef={inputFileRef}
            refCallback={ref}
            restRegisterParams={restRegisterParams}
          />
        )}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center">
          {isEditing ? (
            <>
              <ValidatedTextField
                name="name"
                register={register}
                defaultValue={props.userToDisplay.name}
                fullWidth={false}
                error={errors.name}
              />
              <GenericIconButton
                title="Save"
                icon={<SendIcon />}
                onClick={handleSubmit(onSubmit)}
              />
            </>
          ) : (
            <>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {props.userToDisplay.name}
              </Typography>
              {props.isActualUser && (
                <GenericIconButton
                  title="Edit"
                  icon={<EditIcon />}
                  onClick={() => setIsEditing(true)}
                />
              )}
            </>
          )}
        </Box>
        {!props.isSuggestion && (
          <Typography variant="body1">
            mail: {props.userToDisplay.email}
          </Typography>
        )}
      </Box>
      {!props.isSuggestion && (
        <GenericIconButton
          title="Close"
          icon={<CloseIcon />}
          onClick={() => props.setUserToDisplay(undefined)}
        />
      )}
    </Paper>
  );
}
