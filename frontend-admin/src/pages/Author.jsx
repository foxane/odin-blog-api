import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { Navigate } from 'react-router-dom';

const Author = () => {
  const { user } = useContext(UserContext);

  if (!user) return <Navigate to={'/auth'} />;

  return <div>Author page</div>;
};

export default Author;
