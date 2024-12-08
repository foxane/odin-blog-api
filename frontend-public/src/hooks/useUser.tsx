import { UserContext } from '../UserProvider';
import { useContext } from 'react';

const useUser = () => useContext(UserContext);

export default useUser;
