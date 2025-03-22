import React from "react";
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
import { User } from "../../types/User";
import { Post } from "../../types/Post";
import UserIcon from "../../UserIcon";
import { GenericIconButton } from "../../GenericIconButton";
import useUsers from "../../data_hooks/useUsers";
import { getDateAsString } from "../../Utils";
import postService from "../../http-connections/postService";
import classes from "./PostCard.module.css";
import usePosts from "../../data_hooks/usePosts";

type PostCardProps = {
  deletePost: (id: string) => void;
  post: Post;
  showPostComments: () => void;
  editPost: () => void;
  isClickableIcon?: boolean;
  setUserToFilterBy: (user: User | undefined) => void;
  updatePost: (post: Post) => void;
  actualUser: User | undefined;
};

const PostCard: React.FC<PostCardProps> = (props: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { serverRequest } = usePosts();
  const users = useUsers().users;
  const isActualUser =
    props.actualUser !== undefined && props.post.owner === props.actualUser._id;

  useEffect(() => {
    setIsLiked(props.post.likes.some((like) => like === props.actualUser?._id));
  }, [props.actualUser, props.post]);

  const user: User | undefined = isActualUser
    ? props.actualUser
    : users.find((userToCheck: User) => userToCheck._id === props.post.owner);

  async function onDelete() {
    await postService.delete(props.post._id);
    props.deletePost(props.post._id);
  }

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        title={props.post.title}
        subheader={getDateAsString(props.post.publishDate)}
        avatar={
          <UserIcon
            user={user!} // Ensure the user object is passed to UserIcon
            onClick={
              props.isClickableIcon !== false
                ? () => props.setUserToFilterBy(user!)
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
            if (props.actualUser !== undefined) {
              const updatedPost = {
                ...props.post,
                likes: isLiked
                  ? props.post.likes.filter(
                      (like) => like !== props.actualUser!._id
                    )
                  : [...props.post.likes, props.actualUser._id],
              };
              serverRequest(
                () => {
                  return postService.update(updatedPost);
                },
                () => {
                  setIsLiked((curr) => !curr);
                  props.updatePost(updatedPost);
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
                onDelete();
              }}
            />
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default PostCard;
