import { Paper, Box, Typography, Avatar, IconButton } from "@mui/material";
import UserIcon from "./UserIcon";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

export interface UserToDisplayProps {
  userToDisplay: User;
  setUserToDisplay: (user: User | undefined) => void;
}

export default function UserData(
  props: Required<UserToDisplayProps> & {
    isActualUser: boolean;
    isSuggestion: boolean;
    setActualUser?: (user: User | undefined) => void;
  }
) {
  const [isEditing, setIsEditing] = useState(false);
  const { setUsers } = useUsers();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const img = watch("img");

  useEffect(() => {
    if (img && img[0]) {
      setSelectedImage(img[0]);
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
    setIsEditing(false);
  };

  const { ref, ...restRegisterParams } = register("img");

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "20px",
        display: "flex",
        alignItems: "center",
        gap: props.isSuggestion ? "1rem" : "3rem",
        width: "100%",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <UserIcon
          user={props.userToDisplay}
          style={{
            width: props.isSuggestion ? "50px" : "150px",
            height: props.isSuggestion ? "50px" : "150px",
          }}
          onClick={() => props.setUserToDisplay(props.userToDisplay)}
        />
        {props.isActualUser && (
          <IconButton
            color="primary"
            component="label"
            sx={{ position: "absolute", bottom: 0, right: 0 }}
          >
            <FontAwesomeIcon icon={faImage} />
            <input
              ref={(item) => {
                inputFileRef.current = item;
                ref(item);
              }}
              {...restRegisterParams}
              type="file"
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
            />
          </IconButton>
        )}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center">
          {isEditing ? (
            <>
              <GenericIconButton
                title="Send"
                icon={<SendIcon />}
                onClick={handleSubmit(onSubmit)}
              />
              <ValidatedTextField
                name="name"
                register={register}
                defaultValue={props.userToDisplay.name}
                fullWidth={false}
                error={errors.name}
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
