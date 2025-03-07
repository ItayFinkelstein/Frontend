import Card from "@mui/material/Card/Card";
import { Post } from "./types/Post";
import CardHeader from "@mui/material/CardHeader/CardHeader";
import CardContent from "@mui/material/CardContent/CardContent";
import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box/Box";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import IconButton from "@mui/material/IconButton/IconButton";

type CommentsPageProps = {
  post: Post;
  closeCommentsForm: () => void;
  isCurrentUserPost: boolean;
};

export default function CommentsPage(props: CommentsPageProps) {
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

  // Form submission handler
  const onSubmit = (data: any) => {
    console.log(data);
    props.post.comments.push({ writer: "Itay", message: data.description });
  };
  return (
    <Box
      sx={{
        gap: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        width: "90vw",
        borderRadius: 2,
      }}
    >
      <Typography variant="body2" sx={{ fontSize: "2rem", paddingTop: "5vh" }}>
        Comments of post: {props.post.title}
      </Typography>
      <Typography variant="body2" sx={{ fontSize: "2rem", paddingTop: "5vh" }}>
        Comment Amount: {props.post.comments.length}
      </Typography>
      <IconButton
        aria-label="comments"
        style={{ outline: "none" }}
        onClick={() => props.closeCommentsForm()}
      >
        <KeyboardReturnIcon style={{ marginRight: "5px" }} />
      </IconButton>
      <Box
        sx={{
          alignItems: "center",
          padding: "10vw",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {!props.isCurrentUserPost && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card sx={{ minWidth: 500, maxWidth: 545 }}>
              <CardContent>
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  {...register("description")}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
                <Button type="submit" variant="contained" fullWidth>
                  Submit
                </Button>
              </CardContent>
            </Card>
          </form>
        )}
        {props.post.comments.map((comment) => {
          return (
            <Card sx={{ minWidth: 500, maxWidth: 545 }}>
              <CardHeader
                title={comment.writer}
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
    </Box>
  );
}
