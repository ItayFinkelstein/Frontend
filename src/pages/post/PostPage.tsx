import React, { useState } from "react";
import { Post } from "../../types/Post";
import { User } from "../../types/User";
import PostCard from "./PostCard";
import { GenericIconButton } from "../../GenericIconButton";
import RefreshIcon from "@mui/icons-material/Autorenew";
import CommentsPage from "../comment/CommentsPage";
import PostCardForm from "./PostCardForm";
import postService from "../../http-connections/postService";
import { SharedProps } from "../../App";
import UserData from "../../UserData";

type PostPageProps = {
  posts: Post[];
  hasMorePosts: boolean;
  fetchPosts: () => void;
  userPosts: Post[];
  hasMoreUserPosts: boolean;
  fetchUserPosts: () => void;
  userToFilterBy?: User;
  setUserToFilterBy: (user: User | undefined) => void;
} & SharedProps;

const PostPage: React.FC<PostPageProps> = (props: PostPageProps) => {
  const userToFilterByExists = props.userToFilterBy !== undefined;
  const displayedPosts = userToFilterByExists ? props.userPosts : props.posts;
  const hasMore = userToFilterByExists
    ? props.hasMoreUserPosts
    : props.hasMorePosts;
  const fetchMore = userToFilterByExists
    ? props.fetchUserPosts
    : props.fetchPosts;
  const [postToShowComments, setPostToShowComments] = useState<Post | null>(
    null
  );
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);

  const handlePostAdd = async (updatedPost: Post) => {
    const currentDateTime = new Date()
      .toISOString()
      .replace("T", " ")
      .split(".")[0];
    const postToAdd = {
      ...updatedPost,
      owner: props.actualUser!._id,
      publishDate: currentDateTime,
      commentAmount: 0,
      likes: [],
    };
    const { response } = await postService.add(postToAdd);
    const resolvedResponse = await response;
    props.addPost({
      ...postToAdd,
      image: resolvedResponse.data.image,
      _id: resolvedResponse.data._id,
    });
  };

  async function updatePost(updatedPost: Post) {
    const { response } = postService.update(updatedPost);
    const resolvedResponse = await response;
    setPostToEdit(null);
    props.updatePost({ ...updatedPost, image: resolvedResponse.data.image });
  }

  return postToShowComments === null && postToEdit === null ? (
    <div style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
      {props.userToFilterBy && (
        <UserData
          userToDisplay={props.userToFilterBy}
          setUserToDisplay={props.setUserToFilterBy}
          isActualUser={
            props.actualUser !== undefined &&
            props.actualUser._id === props.userToFilterBy._id
          }
          actualUser={props.actualUser}
          isSuggestion={false}
          setActualUser={props.setActualUser}
        />
      )}
      {(props.userToFilterBy === undefined ||
        props.userToFilterBy._id === props.actualUser?._id) && (
        <PostCardForm post={undefined} updatePost={handlePostAdd} isMain />
      )}
      <>
        {displayedPosts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            setUserToFilterBy={props.setUserToFilterBy}
            showPostComments={() => setPostToShowComments(post)}
            editPost={() => setPostToEdit(post)}
            updatePost={props.updatePost}
            deletePost={props.deletePost}
            actualUser={props.actualUser}
          />
        ))}
        {hasMore && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <GenericIconButton
              title="load more posts"
              icon={<RefreshIcon />}
              onClick={() => fetchMore()}
            />
          </div>
        )}
      </>
    </div>
  ) : postToShowComments !== null ? (
    <CommentsPage
      post={postToShowComments}
      closeCommentsForm={() => setPostToShowComments(null)}
      isCurrentUserPost={props.actualUser?._id === postToShowComments.owner}
      updatePost={props.updatePost}
      actualUser={props.actualUser}
    />
  ) : (
    postToEdit && <PostCardForm post={postToEdit} updatePost={updatePost} />
  );
};

export default PostPage;
