import { useEffect } from 'react';
import { useState } from 'react';

function useDebounce(value, delay) {
  const [valueDebounce, setValueDebounce] = useState(value);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const handler = setTimeout(() => {
      setValueDebounce(value);
      setLoading(false);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return { valueDebounce, loading };
}

export default useDebounce;
