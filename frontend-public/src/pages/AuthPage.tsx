import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import useUser from '../hooks/useUser';
import FormGroup from '../components/ui/FormGroup';

export default function AuthPage() {
  const [type, setType] = useState('login');
  const [cred, setCred] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { user, login, register, error } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === 'login') {
      const { email, password } = cred;
      void login({ email, password });
    } else {
      void register(cred);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setCred(prev => ({ ...prev, [name]: value }));
  };

  if (user) {
    void navigate('/');
  }
  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto bg-neutral-900 text-neutral-100">
      <Header></Header>
      <main className="mx-auto px-5 w-fit">
        <div className="flex justify-center gap-5">
          <button
            className="py-1 px-4 border rounded border-neutral-400 bg-neutral-400 text-black disabled:bg-neutral-600 disabled:border-neutral-600 disabled:cursor-not-allowed"
            onClick={() => {
              setType('login');
            }}
            disabled={type === 'login'}>
            Login
          </button>
          <button
            className="py-1 px-4 border rounded border-neutral-400 bg-neutral-400 text-black disabled:bg-neutral-600 disabled:border-neutral-600 disabled:cursor-not-allowed"
            onClick={() => {
              setType('register');
            }}
            disabled={type === 'register'}>
            Register
          </button>
        </div>

        <form
          className="mt-10 p-6 space-y-5 rounded bg-neutral-800 border border-neutral-600"
          onSubmit={handleSubmit}>
          {error && (
            <ul className="p-2 text-center text-red-400 border border-red-500 rounded">
              {error.message}
              {error.errorDetails &&
                error.errorDetails.map(err => <li key={err}>{err}</li>)}
            </ul>
          )}

          {type === 'login' ? (
            <>
              <FormGroup
                text="Email"
                type="email"
                name="email"
                onChange={handleChange}
              />
              <FormGroup
                text="Password"
                type="password"
                name="password"
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <FormGroup
                text="Name"
                type="text"
                name="name"
                onChange={handleChange}
              />
              <FormGroup
                text="Email"
                type="email"
                name="email"
                onChange={handleChange}
              />
              <FormGroup
                text="Password"
                type="password"
                name="password"
                onChange={handleChange}
              />
            </>
          )}
          <button
            type="submit"
            className="py-1 px-4 mx-auto block bg-amber-300 text-black rounded hover:bg-amber-400">
            Submit
          </button>
        </form>
      </main>
      <Footer></Footer>
    </div>
  );
}
