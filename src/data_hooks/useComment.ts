import { Comment } from "../types/Comment";
import commentService from "../http-connections/commentService";
import useData from "./useData";

const useComments = (postId: string) => {
  const { data, setData, error, setError, isLoading, setIsLoading, fetchData } =
    useData<Comment>(commentService, () => {
      return commentService.getByPostId(postId);
    });

  return {
    comments: data,
    setComments: setData,
    error,
    setError,
    isLoading,
    setIsLoading,
    fetchComments: fetchData,
  };
};

export default useComments;
