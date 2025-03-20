import { useState, useEffect } from "react";
import { Post } from "../types/Post";
import postService, { CanceledError } from "../http-connections/postService";

const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<Error | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const fetchPosts = (page: number) => {
    setIsLoading(true);
    const { response, cancel } = postService.getWithPaging(page);
    response
      .then((res) => {
        if (res.data.posts.length !== 0) {
          setPosts((prevPosts) => [...prevPosts, ...res.data.posts]);
        }
        setHasMorePosts(res.data.hasNextPage);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return; // A "good" error, it means something decides to cancel the fetch request.
        setError(err);
        setIsLoading(false);
      });

    return cancel;
  };

  const loadNextPage = () => {
    if (hasMorePosts && !isLoading) {
      fetchPosts(currentPage + 1);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const cancel = fetchPosts(currentPage);
    return () => cancel(); // Cleanup on unmount, important because of strict mode in development (which calls fetchPosts twice)
  }, []);

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
    fetchPosts: fetchPosts,
    updatePost,
  };
};

export default usePosts;
