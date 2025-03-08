import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
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
    setIsEditing(false);
  };

  return (
    <Card sx={{ width: 440 }}>
      <CardHeader
        title={
          <Box display="flex" alignItems="center">
            {isEditing ? (
              <>
                <IconButton
                  aria-label="send"
                  style={{ outline: "none", marginRight: "8px" }}
                  onClick={handleSubmit(onSubmit)}
                >
                  <SendIcon />
                </IconButton>
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
                {props.isActualUser && (
                  <IconButton
                    aria-label="edit"
                    style={{ outline: "none", marginLeft: "8px" }}
                    onClick={() => setIsEditing(true)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  {props.userToDisplay.name}
                </Typography>
              </>
            )}
          </Box>
        }
        subheader={"mail: " + props.userToDisplay.email}
        avatar={<UserIcon user={props.userToDisplay} />}
      />
      <CardContent>
        <IconButton
          aria-label="comments"
          style={{ outline: "none" }}
          onClick={() => props.setUserToDisplay(undefined)}
        >
          <KeyboardReturnIcon style={{ marginRight: "5px" }} />
        </IconButton>
      </CardContent>
    </Card>
  );
}
