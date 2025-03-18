import React from 'react';
import FormLayout from './FormLayout';
import RegisterForm from '../RegisterForm';

const Register: React.FC = () => {
  return (
    <FormLayout title="Register">
      <RegisterForm />
    </FormLayout>
  );
};

export default Register;