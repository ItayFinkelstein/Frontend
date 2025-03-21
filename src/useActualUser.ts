import { useEffect, useState } from "react";
import { User } from "./types/User";
import useUsers from "./data_hooks/useUsers";

export default function useActualUser() {
  const { users, isLoading } = useUsers();
  const [actualUser, setActualUser] = useState<User | undefined>(
    getUserFromStorageId(users)
  );
  function setActualUserData(user: User | undefined) {
    console.log("setActualUserData", user);
    localStorage.setItem("actualUser", user?._id || "");
    setActualUser(user);
  }

  useEffect(() => {
    if (!isLoading && users.length > 0) {
      setActualUser(getUserFromStorageId(users));
    }
  }, [users.length > 0, isLoading]);

  return { actualUser, setActualUser: setActualUserData };
}

function getUserFromStorageId(userList: User[]) {
  const userId = localStorage.getItem("actualUser");
  console.log(userId);
  return userId === "" || userId === null
    ? undefined
    : userList.find((user) => user._id === userId);
}
