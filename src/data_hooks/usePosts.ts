import { useEffect, useState } from "react";
import { Post } from "../types/Post";
import postService, { CanceledError } from "../http-connections/post-service";

const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const { response, cancel } = postService.getAll();
    response
      .then((res) => {
        setPosts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err instanceof CanceledError) return;
        console.log(err);
        setError(err);
      });

    return () => cancel();
  }, []);

  return { posts, setPosts, error, setError, isLoading, setIsLoading };
};

export default usePosts;
