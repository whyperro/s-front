import { useEffect, useState } from 'react';

const useCurrentPath = (): string => {
  const [path, setPath] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPath(window.location.pathname);
    }
  }, []);

  return path;
};

export default useCurrentPath;
