import { useState, useEffect } from "react";
import { Post } from "../types/Post";
import postService, { CanceledError } from "../http-connections/postService";

const createPostState = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<Error | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const fetchPosts = (
    page: number,
    userId?: string,
    clearPreviousData?: boolean
  ) => {
    setIsLoading(true);
    // console.log("-------------------------");
    // console.log("skip", currentPage);
    const { response, cancel } = postService.getWithPaging(page, userId);
    response
      .then((res) => {
        if (res.data.posts.length !== 0) {
          setPosts((prevPosts) =>
            clearPreviousData
              ? [...res.data.posts]
              : [...prevPosts, ...res.data.posts]
          );
        }
        setHasMorePosts(clearPreviousData === true);
        setIsLoading(false);
        setCurrentPage((prevPage) => (clearPreviousData ? 1 : prevPage + 1));
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err);
        setIsLoading(false);
      });

    return cancel;
  };

  const loadNextPage = (userId?: string) => {
    if (hasMorePosts && !isLoading) {
      fetchPosts(currentPage + 1, userId);
    }
  };

  const updatePost = (updatedPost: Post) => {
    setPosts((prev) => {
      const index = prev.findIndex((post) => post._id === updatedPost._id);
      if (index === -1) return prev;
      const newPosts = [...prev];
      newPosts[index] = updatedPost;
      return newPosts;
    });
  };

  return {
    posts,
    setPosts,
    error,
    setError,
    isLoading,
    loadNextPage,
    hasMorePosts,
    fetchPosts,
    updatePost,
  };
};

const usePosts = () => {
  const allPostsState = createPostState();
  const userPostsState = createPostState();

  useEffect(() => {
    const cancel = allPostsState.fetchPosts(1);
    return () => cancel();
  }, []);

  return {
    allPostsState,
    userPostsState,
  };
};

export default usePosts;
