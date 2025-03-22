import Card from "@mui/material/Card";
import { Post } from "../../types/Post";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { GenericIconButton } from "../../GenericIconButton";
import commentService from "../../http-connections/commentService";
import useComments from "../../data_hooks/useComment";
import useUsers from "../../data_hooks/useUsers";
import { User } from "../../types/User";
import { Comment } from "../../types/Comment";
import UserIcon from "../../UserIcon";
import { IconButton, TextField } from "@mui/material";
import { getDateAsString } from "../../Utils";

type CommentsPageProps = {
  post: Post;
  closeCommentsForm: () => void;
  isCurrentUserPost: boolean;
  updatePost: (post: Post) => void;
  actualUser: User | undefined;
};

export default function CommentsPage(props: CommentsPageProps) {
  const { comments, setComments } = useComments(props.post._id);
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
    props.updatePost({
      ...props.post,
      commentAmount: props.post.commentAmount - 1,
    });
  };

  const onSubmit = async (data: { description: string }) => {
    const { response } = await commentService.add({
      postId: props.post._id,
      owner: props.actualUser!._id,
      message: data.description,
      publishDate: new Date().toISOString(),
    });
    const commentFromResponse: Comment = (await response).data;
    setComments([commentFromResponse, ...comments]);
    props.updatePost({
      ...props.post,
      commentAmount: props.post.commentAmount + 1,
    });
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
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
        {!props.isCurrentUserPost && props.actualUser !== undefined && (
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", alignItems: "flex-start", marginBottom: 2 }}
          >
            <TextField
              variant="outlined"
              multiline
              rows={2}
              fullWidth
              placeholder="Write your comment here..."
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ""}
              sx={{
                mr: 2,
                "& .MuiOutlinedInput-notchedOutline": { border: "1" },
              }}
            />
            <IconButton
              type="submit"
              sx={{
                alignSelf: "center",
                "&:hover": {
                  outline: "none",
                  border: "none",
                },
              }}
            >
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
              sx={{ width: "100%", marginBottom: 1, boxShadow: 1, padding: 1 }}
              key={comment._id}
            >
              <Box
                display="flex"
                alignItems="center"
                sx={{ marginBottom: 0.5 }}
              >
                <UserIcon user={user} />
                <Box
                  sx={{
                    marginLeft: 1,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                      {user?.name ?? "Unknown"}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", marginLeft: 1 }}
                    >
                      {getDateAsString(comment.publishDate)}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", marginTop: 0.5 }}
                  >
                    {comment.message}
                  </Typography>
                </Box>
                {props.actualUser?._id === comment.owner && (
                  <GenericIconButton
                    title="Delete comment"
                    icon={<DeleteIcon />}
                    onClick={() => onDelete(comment)}
                  />
                )}
              </Box>
            </Card>
          );
        })}
      </Box>
    </Paper>
  );
}
