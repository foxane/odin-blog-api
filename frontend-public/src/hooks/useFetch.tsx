import { useEffect, useState } from 'react';

// Sorry..
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export default function useFetch<T>(endpoint: string) {
  const url = import.meta.env.VITE_API_URL + endpoint;
  const token = localStorage.getItem('token');

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token || ''}`,
          },
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const responseData = (await response.json()) as T;
        setData(responseData);
      } catch (error) {
        console.error(error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [url, token]);

  return { data, loading, error };
}
