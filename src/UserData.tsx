import { Card, CardHeader, CardContent, Box, Typography } from "@mui/material";
import UserIcon from "./UserIcon";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ValidatedTextField from "./ValidatedTextField";
import { useState } from "react";
import { GenericIconButton } from "./GenericIconButton";
import userService from "./http-connections/userService";
import { User } from "./types/User";
import useUsers from "./data_hooks/useUsers";

export interface UserToDisplayProps {
  userToDisplay: User;
  setUserToDisplay: (user: User | undefined) => void;
}

export default function UserData(
  props: Required<UserToDisplayProps> & {
    isActualUser: boolean;
    isSuggestion: boolean;
  }
) {
  const [isEditing, setIsEditing] = useState(false);
  const { setUsers } = useUsers();

  const schema = z.object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(20, { message: "Name must be no more than 20 characters" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const updatedUser = { ...props.userToDisplay, name: data.name };
    await userService.update(updatedUser);
    setUsers((users) => {
      return users.map((user) => {
        if (user._id === updatedUser._id) {
          return updatedUser;
        }
        return user;
      });
    });
    setIsEditing(false);
  };

  return (
    <Card sx={{ width: props.isSuggestion ? "10vw" : "30vw" }}>
      <CardHeader
        title={
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
        }
        subheader={!props.isSuggestion && "mail: " + props.userToDisplay.email}
        avatar={<UserIcon user={props.userToDisplay} />}
      />
      {!props.isSuggestion && (
        <CardContent>
          <GenericIconButton
            title="Return"
            icon={<KeyboardReturnIcon />}
            onClick={() => props.setUserToDisplay(undefined)}
          />
        </CardContent>
      )}
    </Card>
  );
}
