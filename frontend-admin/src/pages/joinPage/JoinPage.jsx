import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../../AuthProvider';
import Form from '../../components/ui/Form';
import FormControl from '../../components/ui/FormControl';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import loadingIcon from '../../assets/loading.svg';

export default function JoinPage() {
  const { user } = useContext(AuthContext);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    console.log(`Bearer ${localStorage.getItem('token')}`);

    try {
      setLoading(true);
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${user.id}`,
        { secret: code },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      );

      navigate(0); // Refresh page to make AuthContext fetch user
    } catch (error) {
      if (!error.response) setError(error.message);
      else setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  if (user.authValue >= 2) return <Navigate to={'/'} />;

  return (
    <div className="max-w-md border bg-slate-200 border-slate-400 rounded-md mx-auto p-2 mt-10 relative">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 z-10 flex flex-col items-center justify-center">
          <img src={loadingIcon} alt="loading icon" className="w-14" />
          <p className="italic font-semibold">Processing...</p>
        </div>
      )}
      <Form onSubmit={onSubmit}>
        <p className="text-center text-xl font-semibold">Become author</p>
        <p className="text-center italic text-sm">
          {user.name} need to become author to access this website
        </p>
        {error && (
          <div className="border border-red-300 bg-red-100 text-red-800 rounded-md p-3 flex flex-col gap-2 text-sm">
            <p className=" text-center font-semibold text-base">{error}</p>
          </div>
        )}
        <FormControl>
          <label htmlFor="code">Secret Code</label>
          <Input id={'code'} onChange={e => setCode(e.target.value)} />
        </FormControl>
        <Button
          type={'submit'}
          className={'mt-2 mx-auto bg-blue-500 text-white hover:bg-blue-700'}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
