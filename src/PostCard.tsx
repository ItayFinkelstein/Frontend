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
import { useEffect, useState } from "react";
import { User } from "./types/User";
import { Post } from "./types/Post";
import UserIcon from "./UserIcon";
import { GenericIconButton } from "./GenericIconButton";
import useUsers from "./data_hooks/useUsers";
import { getDateAsString } from "./Utils";
import postService from "./http-connections/post-service";
import useActualUser from "./useActualUser";

type PostCardProps = {
  post: Post;
  showPostComments: () => void;
  editPost: () => void;
  setUser: (newUser: User) => void;
  isClickableIcon?: boolean;
};

export default function PostCard(props: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const users = useUsers().users;
  const { actualUser } = useActualUser();
  const isActualUser =
    actualUser !== undefined && props.post.owner === actualUser._id;

  const user: User = users.find(
    (userToCheck: User) => userToCheck._id === props.post.owner
  )!;

  return (
    <Card sx={{ width: 440 }}>
      <CardHeader
        title={props.post.title}
        subheader={getDateAsString(props.post.publishDate)}
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
      {props.post.image && (
        <CardMedia component="img" height="194" image={props.post.image} />
      )}
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {props.post.message}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {isActualUser && (
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
        )}
        <GenericIconButton
          title="comments"
          icon={<CommentIcon />}
          onClick={props.showPostComments}
        />
        {isActualUser && (
          <>
            <GenericIconButton
              title="Edit post"
              icon={<EditIcon />}
              onClick={props.editPost}
            />
            <GenericIconButton
              title="Delete post"
              icon={<DeleteIcon />}
              onClick={() => {
                postService.delete(props.post._id);
                console.log("post " + props.post.title + " was deleted");
              }}
            />
          </>
        )}
      </CardActions>
    </Card>
  );
}
