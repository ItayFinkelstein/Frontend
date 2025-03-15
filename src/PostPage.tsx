import { useState } from "react";
import PostCard from "./PostCard";
import { Post } from "./types/Post";
import CommentsPage from "./CommentsPage";
import PostCardForm from "./PostCardForm";
import { User } from "./types/User";
import UserData from "./UserData";

type PostPageProps = {
  actualUser?: User;
} & UserToDisplayProps;

export type UserToDisplayProps = {
  userToDisplay?: User | undefined;
  setUserToDisplay: (user: User | undefined) => void;
};
export default function PostPage(props: PostPageProps) {
  const posts: Post[] = [
    {
      id: 1,
      title: "Gil tries Minecraft",
      publishDate: "February 28, 2025",
      userId: 2,
      image: "/src/assets/minecraft.jpg",
      description:
        "The best game in the world of 2010. The game taught us important life lessons about " +
        "building a better world through hard work, resources and friendship.",
      comments: [
        { id: 1, writer: "Itay", message: "Awesome :)" },
        {
          id: 2,
          writer: "Minecraft player",
          message: "Creative mode for the win",
        },
      ],
    },
    {
      id: 2,
      title: "Super Sonic",
      publishDate: "February 28, 2025",
      userId: 3,
      image: "/src/assets/Sonic.jpg",
      description: "Sonic sonic, super sonic",
      comments: [{ id: 3, writer: "Itay", message: "Mario is better" }],
    },
  ];

  const [postToShowComments, setPostToShowComments] = useState<Post | null>(
    null
  );
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);

  return postToShowComments === null && postToEdit === null ? (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {props.userToDisplay && (
        <UserData
          userToDisplay={props.userToDisplay}
          setUserToDisplay={props.setUserToDisplay}
          isActualUser={
            props.actualUser !== undefined &&
            props.actualUser.id === props.userToDisplay.id
          }
        />
      )}
      {posts
        .filter(
          (post) =>
            props.userToDisplay === undefined ||
            post.userId === props.userToDisplay.id
        )
        .map((post) => {
          return (
            <PostCard
              key={post.id}
              post={post}
              showPostComments={() => setPostToShowComments(post)}
              editPost={() => setPostToEdit(post)}
              isActualUser={
                props.actualUser !== undefined &&
                post.userId === props.actualUser.id
              }
              setUser={(newUser: User) => props.setUserToDisplay(newUser)}
              isClickableIcon={props.userToDisplay === undefined}
            />
          );
        })}
    </div>
  ) : postToShowComments !== null ? (
    <CommentsPage
      post={postToShowComments}
      closeCommentsForm={() => setPostToShowComments(null)}
      isCurrentUserPost={props.actualUser?.id === postToShowComments.userId}
      actualUser={props.actualUser?.name}
    />
  ) : (
    postToEdit && (
      <PostCardForm post={postToEdit} hideForm={() => setPostToEdit(null)} />
    )
  );
}
