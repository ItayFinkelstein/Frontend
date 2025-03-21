import { useState, useEffect } from "react";
import { Post } from "../types/Post";
import postService, { CanceledError } from "../http-connections/postService";

/** todo: delete this entire file. Leaving it now for reference only, don't use it */
const usePosts = () => {
  // State for all posts
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [allPostsError, setAllPostsError] = useState<Error | undefined>();
  const [allPostsLoading, setAllPostsLoading] = useState(false);
  const [allPostsPage, setAllPostsPage] = useState(1);
  const [hasMoreAllPosts, setHasMoreAllPosts] = useState(true);

  // State for user-specific posts
  const [userPosts, setUserPosts] = useState<Post[]>([
    {
      _id: "1",
      title: "title",
      message: "message",
      publishDate: "1122",
      owner: "1",
      comments: [],
    },
  ]);
  const [userPostsError, setUserPostsError] = useState<Error | undefined>();
  const [userPostsLoading, setUserPostsLoading] = useState(false);
  const [userPostsPage, setUserPostsPage] = useState(1);
  const [hasMoreUserPosts, setHasMoreUserPosts] = useState(true);

  // Fetch posts for all posts
  const fetchAllPosts = (page: number, clearPreviousData?: boolean) => {
    setAllPostsLoading(true);
    const { response, cancel } = postService.getWithPaging(page);
    response
      .then((res) => {
        if (res.data.posts.length !== 0) {
          setAllPosts((prevPosts) =>
            clearPreviousData
              ? [...res.data.posts]
              : [...prevPosts, ...res.data.posts]
          );
        }
        setHasMoreAllPosts(res.data.hasNextPage);
        setAllPostsLoading(false);
        setAllPostsPage((prevPage) => (clearPreviousData ? 2 : prevPage + 1));
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setAllPostsError(err);
        setAllPostsLoading(false);
      });

    return cancel;
  };

  // Fetch posts for a specific user
  const fetchUserPosts = (
    page: number,
    userId: string,
    clearPreviousData?: boolean
  ) => {
    setUserPostsLoading(true);
    setUserPosts((prev) => [...prev, ...prev]);
    setUserPosts([]);
    const { response, cancel } = postService.getAll();
    response
      .then((res) => {
        if (res.data.posts.length !== 0) {
          setUserPosts((prevPosts) => {
            const updatedPosts = clearPreviousData
              ? [...res.data.posts]
              : [...prevPosts, ...res.data.posts];
            return [...updatedPosts];
          });
        }
        setHasMoreUserPosts(res.data.hasNextPage);
        setUserPostsLoading(false);
        setUserPostsPage((prevPage) => (clearPreviousData ? 2 : prevPage + 1));
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setUserPostsError(err);
        setUserPostsLoading(false);
      });

    return cancel;
  };

  // Load next page for all posts
  const loadNextAllPostsPage = () => {
    if (hasMoreAllPosts && !allPostsLoading) {
      //fetchAllPosts(allPostsPage);
    }
  };

  useEffect(() => {
    console.log("userPosts updated:", userPosts);
  }, [userPosts]);

  // Load next page for user-specific posts
  const loadNextUserPostsPage = (userId: string) => {
    if (hasMoreUserPosts && !userPostsLoading) {
      fetchUserPosts(userPostsPage, userId);
    }
  };

  // Update a post in all posts
  const updateAllPost = (updatedPost: Post) => {
    setAllPosts((prevPosts) => {
      const index = prevPosts.findIndex((post) => post._id === updatedPost._id);
      if (index === -1) return prevPosts;
      const newPosts = [...prevPosts];
      newPosts[index] = updatedPost;
      return newPosts;
    });
  };

  // Update a post in user-specific posts
  const updateUserPost = (updatedPost: Post) => {
    setUserPosts((prevPosts) => {
      const index = prevPosts.findIndex((post) => post._id === updatedPost._id);
      if (index === -1) return prevPosts;
      const newPosts = [...prevPosts];
      newPosts[index] = updatedPost;
      return newPosts;
    });
  };

  // Fetch initial posts for all posts on mount
  useEffect(() => {
    //const cancel = fetchAllPosts(1);
    //return () => cancel();
  }, []);

  return {
    // All posts state and functions
    allPosts,
    allPostsError,
    allPostsLoading,
    hasMoreAllPosts,
    loadNextAllPostsPage,
    updateAllPost,

    // User-specific posts state and functions
    userPosts,
    userPostsError,
    userPostsLoading,
    hasMoreUserPosts,
    loadNextUserPostsPage,
    updateUserPost,
    fetchUserPosts,
  };
};

export default usePosts;
