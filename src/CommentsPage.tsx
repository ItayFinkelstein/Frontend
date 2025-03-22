import Card from "@mui/material/Card";
import { Post } from "./types/Post";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { GenericIconButton } from "./GenericIconButton";
import commentService from "./http-connections/commentService";
import useComments from "./data_hooks/useComment";
import useActualUser from "./useActualUser";
import useUsers from "./data_hooks/useUsers";
import { User } from "./types/User";
import { Comment } from "./types/Comment";
import UserIcon from "./UserIcon";
import { IconButton, TextField } from "@mui/material";
import { getDateAsString } from "./Utils";

type CommentsPageProps = {
  post: Post;
  closeCommentsForm: () => void;
  isCurrentUserPost: boolean;
};

export default function CommentsPage(props: CommentsPageProps) {
  const { comments, setComments, fetchComments } = useComments(props.post._id);
  const { actualUser } = useActualUser();
  const users = useUsers().users;

  const schema = z.object({
    description: z
      .string()
      .min(3, { message: "Comment must be at least 3 characters" })
      .max(200, { message: "Comment must be no more than 200 letters" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onDelete = async (comment: Comment) => {
    await commentService.delete(comment._id);
    setComments((prevComments) =>
      prevComments.filter((c) => c._id !== comment._id)
    );
  };

  const onSubmit = async (data: { description: string }) => {
    await commentService.add({
      postId: props.post._id,
      owner: actualUser!._id,
      message: data.description,
      publishDate: new Date().toISOString(),
    });
    fetchComments();
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, margin: 3, borderRadius: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Comments on: {props.post.title}
        </Typography>
        <GenericIconButton
          title="Close comments"
          icon={<CloseIcon />}
          onClick={props.closeCommentsForm}
        />
      </Box>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        {comments.length} Comments:
      </Typography>
      <Box sx={{ width: "100%", maxHeight: "65vh", overflow: "auto" }}>
        {!props.isCurrentUserPost && actualUser !== undefined && (
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", alignItems: "flex-start", marginBottom: 2 }}
          >
            <TextField
              label="Add a comment"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ""}
              sx={{ mr: 2 }}
            />
            <IconButton type="submit" sx={{ height: "fit-content" }}>
              <SendIcon />
            </IconButton>
          </Box>
        )}
        {comments.map((comment) => {
          const user: User | undefined = users.find(
            (userToCheck: User) => userToCheck._id === comment.owner
          );

          return (
            <Card
              sx={{ width: "100%", marginBottom: 2, boxShadow: 3 }}
              key={comment._id}
            >
              <CardHeader
                avatar={<UserIcon user={user} />}
                title={
                  <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                    {user?.name ?? "Unknown"}
                  </Typography>
                }
                subheader={
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "text.secondary" }}
                  >
                    {getDateAsString(comment.publishDate)}
                  </Typography>
                }
                action={
                  actualUser?._id === comment.owner && (
                    <GenericIconButton
                      title="Delete comment"
                      icon={<DeleteIcon />}
                      onClick={() => onDelete(comment)}
                    />
                  )
                }
              />
              <CardContent>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {comment.message}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Paper>
  );
}
