import React from 'react';
import FormLayout from './FormLayout';
import LoginForm from '../LoginForm';

const Login: React.FC = () => {
  return (
    <FormLayout title="Login">
      <LoginForm />
    </FormLayout>
  );
};

export default Login;