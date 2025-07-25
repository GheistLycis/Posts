import { fetchApi } from '@utils/fetch/fetch';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { SessionContext } from '../SessionContext';

export const useSessionProvider = (): SessionContext => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>();
  const value = useMemo<SessionContext>(
    () => (userName ? { user: { name: userName } } : {}),
    [userName]
  );

  useEffect(() => {
    if (document) {
      const userName = document.cookie
        .split('; ')
        .find((row) => row.startsWith('user='))
        ?.split('=')[1];

      if (userName) {
        setUserName(userName);
      } else {
        fetchApi('/api/auth/logout', { method: 'POST' }).then(() =>
          router.push('/login')
        );
      }
    }
  }, [router]);

  return value;
};
