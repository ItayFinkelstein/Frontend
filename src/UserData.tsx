import { Card, CardHeader, CardContent, Box, Typography } from "@mui/material";
import UserIcon from "./UserIcon";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import { UserToDisplayProps } from "./PostPage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ValidatedTextField from "./ValidatedTextField";
import { useState } from "react";
import { GenericIconButton } from "./GenericIconButton";
import userService from "./http-connections/user-service";

export default function UserData(
  props: Required<UserToDisplayProps> & { isActualUser: boolean }
) {
  const [isEditing, setIsEditing] = useState(false);

  const schema = z.object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(100, { message: "Name must be no more than 100 characters" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log("Edits name:", data);
    userService.update({ ...props.userToDisplay, name: data.name });
    setIsEditing(false);
  };

  return (
    <Card sx={{ width: 440 }}>
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
        subheader={"mail: " + props.userToDisplay.email}
        avatar={<UserIcon user={props.userToDisplay} />}
      />
      <CardContent>
        <GenericIconButton
          title="Return"
          icon={<KeyboardReturnIcon />}
          onClick={() => props.setUserToDisplay(undefined)}
        />
      </CardContent>
    </Card>
  );
}
