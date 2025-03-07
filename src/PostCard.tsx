import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, CardActions, IconButton } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteSelectedIcon from "@mui/icons-material/Favorite";
import FavoriteUnselectedIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import red from "@mui/material/colors/red";
import { User } from "./types/User";
import { Post } from "./types/Post";

type PostCardProps = {
  post: Post;
  showPostComments: () => void;
  editPost: () => void;
  isActualUser: boolean;
  setUser: (newUser: User) => void;
};

export default function PostCard(props: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <Card sx={{ minWidth: 400, maxWidth: 445 }}>
      <CardHeader
        title={props.post.title}
        subheader={props.post.publishDate}
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={props.post.user.iconImage}
            onClick={() => props.setUser(props.post.user)}
          >
            {props.post.user.name[0]}
          </Avatar>
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
          {props.post.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          style={{ outline: "none" }}
          onClick={() => setIsLiked((curr) => !curr)}
        >
          {!props.isActualUser &&
            (isLiked ? (
              <FavoriteSelectedIcon style={{ color: "red" }} />
            ) : (
              <FavoriteUnselectedIcon />
            ))}
        </IconButton>
        <IconButton
          aria-label="comments"
          style={{ outline: "none" }}
          onClick={() => props.showPostComments()}
        >
          <CommentIcon style={{ marginRight: "5px" }} />
          {props.post.comments.length}
        </IconButton>
        {props.isActualUser && (
          <>
            <IconButton
              aria-label="edit post"
              style={{ outline: "none" }}
              onClick={props.editPost}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete post"
              style={{ outline: "none" }}
              onClick={() =>
                console.log("post " + props.post.title + "  was deleted")
              }
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
}
