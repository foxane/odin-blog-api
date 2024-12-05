import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useFetch(endpoint) {
  const token = localStorage.getItem('token');
  const url = import.meta.env.VITE_API_URL + endpoint;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGet = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setData(data);
      } catch (error) {
        if (!error.response) {
          // Server did not response
          setError('Network error, server seems to be offline');
        } else {
          // Server response
          setError(error.response.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGet();
    return () => {
      setError('');
      setData(null);
    };
  }, [token, url]);

  return { loading, data, error };
}
