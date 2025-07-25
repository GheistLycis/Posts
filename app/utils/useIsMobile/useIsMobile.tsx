import { useEffect, useState } from 'react';

export const useIsMobile = (breakpoint = 768): boolean => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < breakpoint);

    checkIsMobile();

    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, [breakpoint]);

  return isMobile;
};
