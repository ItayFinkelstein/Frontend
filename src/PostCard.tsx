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
import { useState } from "react";
import { User } from "./types/User";
import { Post } from "./types/Post";
import UserIcon from "./UserIcon";
import { GenericIconButton } from "./GenericIconButton";
import useUsers from "./data_hooks/useUsers";
import { getDateAsString } from "./Utils";
import postService from "./http-connections/postService";
import useActualUser from "./useActualUser";

type PostCardProps = {
  post: Post;
  showPostComments: () => void;
  editPost: () => void;
  isClickableIcon?: boolean;
  setUserToFilterBy: (user: User | undefined) => void;
};

const PostCard: React.FC<PostCardProps> = ({
  post,
  showPostComments,
  editPost,
  isClickableIcon,
  setUserToFilterBy,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const users = useUsers().users;
  const { actualUser } = useActualUser();
  const isActualUser =
    actualUser !== undefined && post.owner === actualUser._id;

  const user: User | undefined = users.find(
    (userToCheck: User) => userToCheck._id === post.owner
  );

  return (
    <Card sx={{ width: 440 }}>
      <CardHeader
        title={post.title}
        subheader={getDateAsString(post.publishDate)}
        avatar={
          <UserIcon
            user={user!} // Ensure the user object is passed to UserIcon
            onClick={
              isClickableIcon !== false
                ? () => setUserToFilterBy(user!)
                : undefined
            }
          />
        }
      />
      {post.image && (
        <CardMedia component="img" height="194" image={post.image} />
      )}
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <GenericIconButton
          title="like this post"
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
          onClick={showPostComments}
        />
        {isActualUser && (
          <>
            <GenericIconButton
              title="Edit post"
              icon={<EditIcon />}
              onClick={editPost}
            />
            <GenericIconButton
              title="Delete post"
              icon={<DeleteIcon />}
              onClick={() => {
                postService.delete(post._id);
                /** todo: fix in next PR */
                console.log("post " + post.title + " was deleted");
              }}
            />
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default PostCard;
