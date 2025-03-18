import { Post } from "../types/Post";
import postService from "../http-connections/post-service";
import useData from "./useData";

const usePosts = () => {
  const { data, setData, error, setError, isLoading, setIsLoading, fetchData } =
    useData<Post>(postService);

  return {
    posts: data,
    setPosts: setData,
    error,
    setError,
    isLoading,
    setIsLoading,
    fetchPosts: fetchData,
  };
};

export default usePosts;