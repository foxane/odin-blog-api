import { useContext, useState } from 'react';

import FormLogin from '../components/FormLogin';
import Button from '../components/ui/Button';
import FormRegister from '../components/FormRegister';
import loadingIcon from '../assets/loading.svg';
import { UserContext } from '../context/UserProvider';
import { Navigate } from 'react-router-dom';

const AuthPage = () => {
  const { user, loading } = useContext(UserContext);
  const [type, setType] = useState('login');
  const [formLoading, setFormLoading] = useState(false);

  if (user) return <Navigate to={'/'} />;

  return (
    <div className="max-w-md border bg-slate-200 border-slate-400 rounded-md mx-auto p-2 mt-10">
      {/* Loading overlay */}
      {(formLoading || loading) && (
        <div className="absolute inset-0 bg-white bg-opacity-50 z-10 flex flex-col items-center justify-center">
          <img src={loadingIcon} alt="loading icon" className="w-14" />
        </div>
      )}

      <h1 className="text-center text-md font-semibold">Authentication</h1>
      <div className="">
        <div className="flex justify-center gap-2 my-3">
          <Button
            disabled={type === 'login'}
            onClick={() => setType('login')}
            className={
              type === 'login'
                ? 'bg-slate-400 text-white disabled:opacity-80'
                : ''
            }>
            Login
          </Button>
          <Button
            disabled={type === 'register'}
            onClick={() => setType('register')}
            className={type !== 'login' ? 'bg-slate-400 text-white' : ''}>
            Register
          </Button>
        </div>

        <div className="p-2">
          {type === 'login' ? (
            <FormLogin setLoading={setFormLoading} />
          ) : (
            <FormRegister setLoading={setFormLoading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
