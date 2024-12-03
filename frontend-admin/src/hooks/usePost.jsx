import axios from 'axios';
import { useState } from 'react';

export default function usePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const url = import.meta.env.VITE_API_URL;

  async function request(method, endpoint, data, token) {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        method,
        url: `${url}${endpoint}`,
        data,
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  function edit(data, token) {
    return request('put', `/posts/${data.id}`, data, token);
  }

  function create(data, token) {
    return request('post', '/posts', data, token);
  }

  function publish(data, token) {
    return request('patch', `/posts/${data.id}`, data, token);
  }

  function deletePost(id, token) {
    return request('delete', `/posts/${id}`, null, token);
  }

  return { loading, error, edit, create, publish, deletePost };
}
