import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from './ui/Form';
import FormControl from './ui/FormControl';
import Input from './ui/Input';
import Button from './ui/Button';
import { post } from '../utils/api';
import PropTypes from 'prop-types';

export default function FormLogin({ setLoading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    post('/auth/login', { email, password })
      .then(data => {
        localStorage.setItem('token', data.token);
        navigate('/');
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }

  return (
    <Form onSubmit={onSubmit}>
      {error && (
        <ul className="border border-red-300 bg-red-100 text-red-800 rounded-md p-3 flex flex-col gap-2 text-sm">
          <p
            className={`text-center font-semibold text-base border-b ${
              !error.errorDetails ? 'border-b-red-400 pb-2' : ''
            }`}>
            {error.message}
          </p>
          {error.errorDetails &&
            error.errorDetails.map(err => <li key={err.msg}>{err.msg}</li>)}
        </ul>
      )}
      <FormControl>
        <label htmlFor="email">Email</label>
        <Input
          type={'email'}
          id={'email'}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <label htmlFor="password">Password</label>
        <Input
          type={'password'}
          id={'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </FormControl>

      <Button
        type={'submit'}
        className={'bg-blue-600 text-white mt-2 hover:bg-blue-700 mx-auto'}>
        Submit
      </Button>
    </Form>
  );
}

FormLogin.propTypes = {
  setLoading: PropTypes.func,
};
