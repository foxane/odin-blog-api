import { useEffect, useState } from 'react';
import axios from 'axios';

export default function usePost(id) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState(null);

  const fetchPost = async userId => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${userId}/posts/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      setPosts(data.data.posts);
      console.log(data);
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

  useEffect(() => {
    fetchPost(id);

    return () => {
      setPosts(null);
      setError('');
    };
  }, [id]);

  return { loading, error, posts };
}
