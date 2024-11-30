import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../../AuthProvider';

export default function Author() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <p className="text-3xl">Author page placeholder</p>;
}
