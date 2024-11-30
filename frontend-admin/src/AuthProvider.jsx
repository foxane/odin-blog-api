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
          setUser(response.data.data.user);
        })
        .catch(() => logout())
        .finally(() => setLoading(false));
    }
  }, []);

  const login = async credentials => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        credentials,
      );

      localStorage.setItem('token', data.data.token);
      setUser(data.data.user);
    } catch (error) {
      // Server did not response
      if (!error.response) {
        setError(new Error('Network error, server seems to be offline'));
      } else {
        // Server response
        setError(
          new ApiError(
            `Login failed: ${error.response.data.message}`,
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
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export { AuthContext, AuthProvider };
