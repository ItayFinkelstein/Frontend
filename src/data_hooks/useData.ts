import { useEffect, useState } from "react";
import { CanceledError, HttpService } from "../http-connections/http-service";

const useData = <T extends { _id: string }>(service: HttpService<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const { response, cancel } = service.getAll();
    response
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err instanceof CanceledError) return;
        console.log(err);
        setError(err);
      });

    return () => cancel();
  }, [service]);

  return { data, setData, error, setError, isLoading, setIsLoading };
};

export default useData;
