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
import postService from "./http-connections/postService";
import useActualUser from "./useActualUser";
import usePosts from "./data_hooks/usePosts";
import classes from "./PostCard.module.css";

type PostCardProps = {
  post: Post;
  showPostComments: () => void;
  editPost: () => void;
  setUser: (newUser: User) => void;
  isClickableIcon?: boolean;
};

export default function PostCard(props: PostCardProps) {
  const users = useUsers().users;
  const { serverRequest } = usePosts();
  const { actualUser } = useActualUser();
  const isActualUser =
    actualUser !== undefined && props.post.owner === actualUser._id;
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(props.post.likes.some((like) => like === actualUser?._id));
  }, [actualUser, props.post]);

  const user: User = users.find(
    (userToCheck: User) => userToCheck._id === props.post.owner
  )!;

  return (
    <Card sx={{ width: "30vw" }}>
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
        <GenericIconButton
          title="like this post"
          icon={
            <div className={classes.iconNumber}>
              {isLiked ? (
                <FavoriteSelectedIcon style={{ color: "red" }} />
              ) : (
                <FavoriteUnselectedIcon />
              )}
              {props.post.likes.length}
            </div>
          }
          onClick={() => {
            if (actualUser !== undefined) {
              const updatedPost = {
                ...props.post,
                likes: isLiked
                  ? props.post.likes.filter((like) => like !== actualUser._id)
                  : [...props.post.likes, actualUser._id],
              };
              serverRequest(
                () => {
                  return postService.update(updatedPost);
                },
                () => {
                  setIsLiked((curr) => !curr);
                  /** todo: once post-get-paging gets merged, update the user in users list */
                }
              );
            }
          }}
        />
        <GenericIconButton
          title="comments"
          icon={
            <div className={classes.iconNumber}>
              <CommentIcon />
              {props.post.commentAmount}
            </div>
          }
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
