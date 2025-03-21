import React, { useEffect } from "react";
import { Post } from "./types/Post";
import { User } from "./types/User";
import PostCard from "./PostCard";
import UserData from "./UserData";

type PostPageProps = {
  posts: Post[];
  hasMorePosts: boolean;
  fetchPosts: () => void;
  userPosts: Post[];
  hasMoreUserPosts: boolean;
  fetchUserPosts: () => void;
  userToFilterBy?: User;
  setUserToFilterBy: (user: User | undefined) => void;
};

const PostPage: React.FC<PostPageProps> = ({
  posts,
  hasMorePosts,
  fetchPosts,
  userPosts,
  hasMoreUserPosts,
  fetchUserPosts,
  userToFilterBy,
  setUserToFilterBy,
}) => {
  const displayedPosts = !!userToFilterBy ? userPosts : posts;
  const hasMore = !!userToFilterBy ? hasMoreUserPosts : hasMorePosts;
  const fetchMore = !!userToFilterBy ? fetchUserPosts : fetchPosts;

  useEffect(() => {
    console.log("userToFilterBy changed:", userToFilterBy);
  }, [userToFilterBy]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {userToFilterBy && (
        <UserData
          userToDisplay={userToFilterBy}
          setUserToDisplay={setUserToFilterBy}
          isActualUser={false} // Adjust this based on your logic for determining the actual user
        />
      )}
      <>
        {displayedPosts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            setUserToFilterBy={setUserToFilterBy}
            showPostComments={() =>
              console.log(`Show comments for post ${post._id}`)
            } // Placeholder function
            editPost={() => console.log(`Edit post ${post._id}`)} // Placeholder function
          />
        ))}
        {hasMore && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={fetchMore}>Load More</button>
          </div>
        )}
      </>
    </div>
  );
};

export default PostPage;
