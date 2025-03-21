import Card from "@mui/material/Card/Card";
import { Post } from "./types/Post";
import CardHeader from "@mui/material/CardHeader/CardHeader";
import CardContent from "@mui/material/CardContent/CardContent";
import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box/Box";
import Paper from "@mui/material/Paper/Paper";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button/Button";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import ValidatedTextField from "./ValidatedTextField";
import { GenericIconButton } from "./GenericIconButton";
import classes from "./CommentsPage.module.css";
import commentService from "./http-connections/commentService";
import useComments from "./data_hooks/useComment";
import useActualUser from "./useActualUser";

type CommentsPageProps = {
  post: Post;
  closeCommentsForm: () => void;
  isCurrentUserPost: boolean;
};

export default function CommentsPage(props: CommentsPageProps) {
  const { comments, fetchComments } = useComments(props.post._id);
  const { actualUser } = useActualUser();
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

  const onSubmit = async (data: { description: string }) => {
    await commentService.add({
      postId: props.post._id,
      owner: actualUser!.name,
      message: data.description,
    });
    fetchComments();
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
      <Typography variant="h5" className={classes.header}>
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
      <Box className={classes.commentsContainer}>
        {!props.isCurrentUserPost && actualUser !== undefined && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card sx={{ width: "100%", marginBottom: 2 }}>
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
          return (
            <Card sx={{ width: "100%", marginBottom: 2 }} key={comment._id}>
              <CardHeader
                title={comment.owner}
                subheader={comment.publishDate}
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
