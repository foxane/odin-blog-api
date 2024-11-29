import { useEffect, useState } from 'react';

import Form from './ui/Form';
import FormControl from './ui/FormControl';
import Input from './ui/Input';
import Button from './ui/Button';
import PropTypes from 'prop-types';
import { post } from '../utils/api';

export default function FormRegister({ setLoading }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [isMatch, setIsMatch] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsMatch(password === conPassword);
  }, [password, conPassword]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!isMatch) return;
    setLoading(true);

    try {
      const data = await post('/auth/register', { name, email, password });
      localStorage.setItem('token', data.token);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      {error && (
        <ul className="border border-red-300 bg-red-100 text-red-800 rounded-md p-3 flex flex-col gap-2 text-sm">
          <p className=" text-center font-semibold text-base border-b border-b-red-400 pb-2">
            {error.message}
          </p>
          {error.errorDetails &&
            error.errorDetails.map(err => <li key={err.msg}>{err.msg}</li>)}
        </ul>
      )}
      <FormControl>
        <label htmlFor="name">Name</label>
        <Input
          type={'text'}
          id={'name'}
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <label htmlFor="regEmail">Email</label>
        <Input
          type={'email'}
          id={'regEmail'}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <label htmlFor="regPassword">Password</label>
        <Input
          type={'password'}
          id={'regPassword'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={!isMatch ? 'border-red-500' : ''}
        />
      </FormControl>
      <FormControl>
        <label htmlFor="regConfirm">Confirm Password</label>
        <Input
          type={'password'}
          id={'regConfirm'}
          value={conPassword}
          onChange={e => setConPassword(e.target.value)}
          className={!isMatch ? 'border-red-500' : ''}
        />
        <p
          className={
            'text-xs text-red-600 ms-2 font-bold' + (isMatch ? ' hidden' : '')
          }>
          Password did not match
        </p>
      </FormControl>

      <Button
        type={'submit'}
        className={'bg-blue-600 text-white mt-2 hover:bg-blue-700 mx-auto'}>
        Submit
      </Button>
    </Form>
  );
}

FormRegister.propTypes = {
  setLoading: PropTypes.func,
};
