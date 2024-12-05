import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Handle my api error response
class ApiError extends Error {
  constructor(message, errorDetails = []) {
    super(message), (this.errorDetails = errorDetails);
  }
}

const AuthContext = createContext({
  user: {},
  error: {},
  loading: false,
  login: function () {},
  logout: function () {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_API_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
          setUser(response.data.user);
        })
        .catch(() => logout())
        .finally(() => setLoading(false));
    }
  }, []);

  const fetchAuth = async (credentials, isLogin = true) => {
    const endpoint = isLogin ? 'login' : 'register';
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/${endpoint}`,
        credentials,
      );

      localStorage.setItem('token', data.token);
      setUser(data.user);
    } catch (error) {
      if (!error.response) {
        // Server did not response
        setError(new Error('Network error, server seems to be offline'));
      } else {
        // Server response
        setError(
          new ApiError(
            `${isLogin ? 'Login' : 'Registration'} failed: ${
              error.response.data.message
            }`,
            error.response.data.errorDetails,
          ),
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setError(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, fetchAuth, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export { AuthContext, AuthProvider };
