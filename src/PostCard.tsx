import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteSelectedIcon from "@mui/icons-material/Favorite";
import FavoriteUnselectedIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { User } from "./types/User";
import { Post } from "./types/Post";
import UserIcon from "./UserIcon";
import { users } from "./SharedData";
import { GenericIconButton } from "./GenericIconButton";

type PostCardProps = {
  post: Post;
  showPostComments: () => void;
  editPost: () => void;
  isActualUser: boolean;
  setUser: (newUser: User) => void;
  isClickableIcon?: boolean;
};

export default function PostCard(props: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const user = users.find(
    (userToCheck) => userToCheck._id === props.post.owner
  )!;
  return (
    <Card sx={{ width: 440 }}>
      <CardHeader
        title={props.post.title}
        subheader={props.post.publishDate}
        avatar={
          <UserIcon
            user={user}
            onClick={
              props.isClickableIcon !== false
                ? () => props.setUser(user)
                : undefined
            }
          />
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={props.post.image}
        // alt={props.post.title}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {props.post.message}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <GenericIconButton
          title="add to favorites"
          icon={
            isLiked ? (
              <FavoriteSelectedIcon style={{ color: "red" }} />
            ) : (
              <FavoriteUnselectedIcon />
            )
          }
          onClick={() => setIsLiked((curr) => !curr)}
        />
        <GenericIconButton
          title="comments"
          icon={<CommentIcon />}
          onClick={props.showPostComments}
        />
        {props.isActualUser && (
          <>
            <GenericIconButton
              title="Edit post"
              icon={<EditIcon />}
              onClick={props.editPost}
            />
            <GenericIconButton
              title="Delete post"
              icon={<DeleteIcon />}
              onClick={() =>
                console.log("post " + props.post.title + " was deleted")
              }
            />
          </>
        )}
      </CardActions>
    </Card>
  );
}
