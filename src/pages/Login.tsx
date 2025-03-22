import React from "react";
import FormLayout from "./FormLayout";
import LoginForm from "../LoginForm";
import { User } from "../types/User";

const Login: React.FC<{ setActualUser: (user: User | undefined) => void }> = ({
  setActualUser,
}) => {
  return (
    <FormLayout title="Login">
      <LoginForm setActualUser={setActualUser} />
    </FormLayout>
  );
};

export default Login;
