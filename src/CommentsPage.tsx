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
import Button from "@mui/material/Button";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import DeleteIcon from "@mui/icons-material/Delete";
import ValidatedTextField from "./ValidatedTextField";
import { GenericIconButton } from "./GenericIconButton";
import classes from "./CommentsPage.module.css";
import commentService from "./http-connections/commentService";
import useComments from "./data_hooks/useComment";
import useActualUser from "./useActualUser";
import useUsers from "./data_hooks/useUsers";
import { User } from "./types/User";
import { Comment } from "./types/Comment";
import UserIcon from "./UserIcon";

type CommentsPageProps = {
  post: Post;
  closeCommentsForm: () => void;
  isCurrentUserPost: boolean;
};

export default function CommentsPage(props: CommentsPageProps) {
  const { comments, setComments, fetchComments } = useComments(props.post._id);
  const { actualUser } = useActualUser();
  console.log("actualUser", actualUser);
  console.log("props.isCurrentUserPost", props.isCurrentUserPost);

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
    });
    fetchComments(); /** todo: once post-get-paging is merged, update the post itself instead of re-fetching the comments */
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, margin: 3, borderRadius: 2 }}>
      <Typography
        variant="h5"
        className={classes.header}
        sx={{ fontWeight: "bold" }}
      >
        Comments of post: {props.post.title}
      </Typography>
      <Typography variant="h6" className={classes.header}>
        Comment Amount: {comments.length}
      </Typography>
      <GenericIconButton
        title="Close comments"
        icon={<KeyboardReturnIcon />}
        onClick={props.closeCommentsForm}
      />
      <Box
        className={classes.commentsContainer}
        sx={{ width: "100%", overflowY: "auto" }}
      >
        {!props.isCurrentUserPost && actualUser !== undefined && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card sx={{ width: "100%", marginBottom: 2, boxShadow: 3 }}>
              <CardContent>
                <ValidatedTextField
                  name="description"
                  label="Comment"
                  register={register}
                  error={errors.description}
                />
                <Button type="submit" variant="contained" fullWidth>
                  Submit
                </Button>
              </CardContent>
            </Card>
          </form>
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
                    {new Date().toLocaleString()}
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
