import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { Post } from "./types/Post";
import CommentsPage from "./CommentsPage";
import PostCardForm from "./PostCardForm";
import { User } from "./types/User";
import UserData from "./UserData";
import RefreshIcon from "@mui/icons-material/Autorenew";
import useActualUser from "./useActualUser";
import { GenericIconButton } from "./GenericIconButton";

type PostPageProps = {} & UserToDisplayProps;

export type UserToDisplayProps = {
  posts: Post[];
  userToDisplay?: User | undefined;
  setUserToDisplay: (user: User | undefined) => void;
  hasMorePosts: boolean;
  fetchData: () => void;
};

export default function PostPage(props: PostPageProps) {
  // const {
  //   allPosts,
  //   allPostsLoading,
  //   hasMoreAllPosts,
  //   loadNextAllPostsPage,
  //   updateAllPost,
  //   userPostsLoading,
  //   hasMoreUserPosts,
  //   loadNextUserPostsPage,
  //   updateUserPost,
  //   userPosts,
  // } = usePosts();

  // const { isLoading, hasMorePosts, fetchAllPosts } = useAllPosts();

  const { actualUser } = useActualUser();

  // useEffect(() => {
  //   console.log("hasMoreUserPosts", hasMoreUserPosts);
  // }, [hasMoreUserPosts]);

  useEffect(() => {
    console.log("FIRST RENDER!!!!!!!!!!!!!!!!!!");
  }, []);

  // Dynamically decide which posts to use
  // const posts = props.userToDisplay !== undefined ? userPosts : allPosts;
  // const loadNextPage =
  //   props.userToDisplay !== undefined
  //     ? () => loadNextUserPostsPage(props.userToDisplay!._id)
  //     : loadNextAllPostsPage;
  // const isLoading =
  //   props.userToDisplay !== undefined ? userPostsLoading : allPostsLoading;
  // const hasMorePosts =
  //   props.userToDisplay !== undefined ? hasMoreUserPosts : hasMoreAllPosts;
  // const updatePost =
  //   props.userToDisplay !== undefined ? updateUserPost : updateAllPost;

  const [postToShowComments, setPostToShowComments] = useState<Post | null>(
    null
  );
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);

  const handlePostEdit = (updatedPost: Post) => {
    setPostToEdit(null);
    //updatePost(updatedPost);
  };

  // useEffect(() => {
  //   console.log("USER POSTS in PostPage updated:", userPosts);
  // }, [userPosts]);

  return postToShowComments === null && postToEdit === null ? (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {props.userToDisplay && (
        <UserData
          posts={props.posts}
          userToDisplay={props.userToDisplay}
          setUserToDisplay={props.setUserToDisplay}
          isActualUser={
            actualUser !== undefined &&
            actualUser._id === props.userToDisplay._id
          }
          hasMorePosts={props.hasMorePosts}
        />
      )}
      {props.posts.map((post) => {
        return (
          <PostCard
            key={post._id}
            post={post}
            showPostComments={() => setPostToShowComments(post)}
            editPost={() => setPostToEdit(post)}
            setUser={(newUser: User) => props.setUserToDisplay(newUser)}
            isClickableIcon={props.userToDisplay === undefined}
          />
        );
      })}
      {props.hasMorePosts && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <GenericIconButton
            title="load more posts"
            icon={<RefreshIcon />}
            onClick={() => props.fetchData()}
            //disabled={isLoading}
          />
        </div>
      )}
    </div>
  ) : postToShowComments !== null ? (
    <CommentsPage
      post={postToShowComments}
      closeCommentsForm={() => setPostToShowComments(null)}
      isCurrentUserPost={actualUser?._id === postToShowComments.owner}
    />
  ) : (
    postToEdit && (
      <PostCardForm post={postToEdit} handlePostUpdate={handlePostEdit} />
    )
  );
}
