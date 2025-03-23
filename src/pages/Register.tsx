import React from "react";
import FormLayout from "./FormLayout";
import RegisterForm from "./RegisterForm";
import { User } from "../types/User";

const Register: React.FC<{
  setActualUser: (user: User | undefined) => void;
}> = ({ setActualUser }) => {
  return (
    <FormLayout title="Register">
      <RegisterForm setActualUser={setActualUser} />
    </FormLayout>
  );
};

export default Register;
