import { useState } from "react";
import { User } from "./types/User";

export default function useActualUser() {
  const [actualUser, setActualUser] = useState<User | undefined>(undefined);
  return { actualUser, setActualUser };
}
