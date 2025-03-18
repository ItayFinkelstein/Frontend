import { Comment } from "../types/Comment";
import commentService from "../http-connections/comment-service";
import useData from "./useData";

const useComments = (postId: string) => {
  const { data, setData, error, setError, isLoading, setIsLoading } =
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
  };
};

export default useComments;
