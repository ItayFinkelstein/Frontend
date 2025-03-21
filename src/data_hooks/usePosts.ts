import { Post } from "../types/Post";
import postService from "../http-connections/postService";
import useData from "./useData";
import { AxiosResponse, CanceledError } from "axios";

const usePosts = () => {
  const { data, setData, error, setError, isLoading, setIsLoading, fetchData } =
    useData<Post>(postService);

  const serverRequest = (
    getFunction: () => {
      response: Promise<AxiosResponse<any, any>>;
      cancel: () => void;
    },
    onSuccess: (res: AxiosResponse<any, any>) => void
  ) => {
    setIsLoading(true);
    const { response, cancel } = getFunction();
    response
      .then((res) => {
        onSuccess(res);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return; // A "good" error, it means something decides to cancel the fetch request.
        setError(err);
        setIsLoading(false);
      });

    return cancel;
  };

  return {
    posts: data,
    setPosts: setData,
    error,
    setError,
    isLoading,
    setIsLoading,
    fetchPosts: fetchData,
    serverRequest,
  };
};

export default usePosts;
