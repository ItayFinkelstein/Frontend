import { useEffect, useState } from "react";
import { CanceledError, HttpService } from "../http-connections/http-service";
import { AxiosResponse } from "axios";

const useData = <T extends { _id: string }>(
  service: HttpService<T>,
  getfunction?: () => {
    response: Promise<AxiosResponse<any, any>>;
    cancel: () => void;
  }
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    const { response, cancel } = getfunction ? getfunction() : service.getAll();
    response
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err instanceof CanceledError) return;
        console.warn(err);
        setError(err);
      });

    return () => cancel();
  };

  useEffect(() => {
    fetchData();
  }, [service]);

  return { data, setData, error, setError, isLoading, setIsLoading, fetchData };
};

export default useData;