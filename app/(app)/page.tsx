'use client';
import { FC } from 'react';
import { useHome } from './hooks/useHome';

const Home: FC = () => {
  const {} = useHome();

  return <main className="flex flex-col items-center"></main>;
};

export default Home;
