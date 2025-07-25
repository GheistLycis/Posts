'use client';
import { FC } from 'react';
import { useLogin } from './hooks/useLogin';

const Login: FC = () => {
  const {} = useLogin();

  return <main></main>;
};

export default Login;
