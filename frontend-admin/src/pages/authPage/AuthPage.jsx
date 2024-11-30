import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../../AuthProvider';
import Button from '../../components/ui/Button';
import loadingIcon from '../../assets/loading.svg';
import FormLogin from './FormLogin';

export default function AuthPage() {
  const { user, loading } = useContext(AuthContext);
  const [form, setForm] = useState('login');

  if (loading) return <>Loading..</>;
  if (user) return <Navigate to={'/'} />;
  return (
    <div className="max-w-md border bg-slate-200 border-slate-400 rounded-md mx-auto p-2 mt-10">
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 z-10 flex flex-col items-center justify-center">
          <img src={loadingIcon} alt="loading icon" className="w-14" />
        </div>
      )}

      <div className="flex gap-2 p-2 justify-center">
        <Button
          disabled={form === 'login'}
          onClick={() => setForm('login')}
          className={form === 'login' ? 'bg-slate-400 text-white ' : ''}>
          Login
        </Button>
        <Button
          disabled={form === 'register'}
          onClick={() => setForm('register')}
          className={form === 'register' ? 'bg-slate-400 text-white' : ''}>
          Register
        </Button>
      </div>

      <div className="p-2">
        {form === 'login' ? <FormLogin /> : 'Register placeholder'}
      </div>
    </div>
  );
}
