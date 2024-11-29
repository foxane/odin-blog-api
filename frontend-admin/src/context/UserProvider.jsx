import { createContext } from 'react';
import useUser from '../hooks/useUser';
import PropTypes from 'prop-types';

const UserContext = createContext({
  user: null,
  setUser: () => {},
  loading: false,
  error: '',
});

const UserProvider = ({ children }) => {
  const { user, setUser, loading, error } = useUser();
  function logout() {
    setUser(null);
    localStorage.removeItem('token');
  }

  return (
    <UserContext.Provider value={{ user, setUser, loading, error, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

UserProvider.propTypes = {
  children: PropTypes.node,
};
