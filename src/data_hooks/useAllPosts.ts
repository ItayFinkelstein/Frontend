import postService from "../http-connections/postService";
import useData from "./useData";
import { Post } from "../types/Post";
import { useState } from "react";

const useAllPosts = () => {
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [page, setPage] = useState(1);
  const { data, setData, error, setError, isLoading, setIsLoading, fetchData } =
    useData<Post>(
      postService,
      () => {
        return postService.getWithPaging(page);
      },
      (data) => data.posts,
      (res) => {
        setHasMorePosts(res.data.hasNextPage);
        setPage((prevPage) => prevPage + 1);
      }
    );

  return {
    posts: data,
    setPosts: setData,
    error,
    setError,
    isLoading,
    setIsLoading,
    fetchAllPosts: fetchData,
    hasMorePosts,
  };
};

export default useAllPosts;
