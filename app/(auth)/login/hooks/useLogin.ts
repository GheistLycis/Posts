import { useCallback } from 'react';

interface UseLogin {
  login: (user: string) => void;
}

export const useLogin = (): UseLogin => {
  const login = useCallback(() => {}, []);

  return { login };
};
