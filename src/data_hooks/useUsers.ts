import userService from "../http-connections/user-service";
import { User } from "../types/User";
import useData from "./useData";

const useUsers = () => {
  const { data, setData, error, setError, isLoading, setIsLoading } =
    useData<User>(userService);

  return {
    users: data,
    setUsers: setData,
    error,
    setError,
    isLoading,
    setIsLoading,
  };
};
export default useUsers;
