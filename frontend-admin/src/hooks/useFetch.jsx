import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useFetch(endpoint, responseKey) {
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

        setData(data.data[responseKey]);
      } catch (error) {
        if (!error.response) {
          // Server did not response
          setError('Network error, server seems to be offline');
        } else {
          // Server response
          setError(error.response.data.message);
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
  }, [token, url, responseKey]);

  return { loading, data, error };
}
