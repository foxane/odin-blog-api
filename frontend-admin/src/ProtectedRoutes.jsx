import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export function UserRoute({ element }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to={'/login'} />;

  return element;
}

export function AuthorRoute({ element }) {
  const { user } = useContext(AuthContext);
  if (user.authValue < 2) return <Navigate to={'/login'} />;

  return element;
}

export function AdminRoute({ element }) {
  const { user } = useContext(AuthContext);
  if (user.authValue < 3) return <Navigate to={'/login'} />;

  return element;
}

UserRoute.propTypes = {
  element: PropTypes.node,
};
AuthorRoute.propTypes = {
  element: PropTypes.node,
};
AdminRoute.propTypes = {
  element: PropTypes.node,
};
