import { useState, useEffect } from "react";
import { Post } from "../types/Post";
import postService, { CanceledError } from "../http-connections/postService";

const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<Error | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = (page: number) => {
    setIsLoading(true);
    const { response, cancel } = postService.getWithPaging(page);
    response
      .then((res) => {
        if (res.data.posts.length !== 0) {
          setPosts((prevPosts) => [...prevPosts, ...res.data.posts]);
        }
        setHasMore(res.data.hasNextPage);
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
    if (hasMore && !isLoading) {
      fetchPosts(currentPage + 1);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const cancel = fetchPosts(currentPage);
    return () => cancel(); // Cleanup on unmount, important because of strict mode in development (which calls fetchPosts twice)
  }, []);

  return {
    posts,
    setPosts,
    error,
    setError,
    isLoading,
    loadNextPage,
    hasMore,
    fetchPosts: fetchPosts,
  };
};

export default usePosts;
