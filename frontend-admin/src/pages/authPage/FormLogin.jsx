import { useContext, useState } from 'react';

import Form from '../../components/ui/Form';
import FormControl from '../../components/ui/FormControl';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { AuthContext } from '../../AuthProvider';

export default function FormLogin() {
  const [data, setData] = useState({ email: '', password: '' });
  const { login, error } = useContext(AuthContext);

  function onChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    login(data);
  }

  return (
    <Form onSubmit={onSubmit}>
      {error && (
        <ul className="border border-red-300 bg-red-100 text-red-800 rounded-md p-3 flex flex-col gap-2 text-sm">
          <p className=" text-center font-semibold text-base">
            {error.message}
          </p>
          {error.errorDetails &&
            error.errorDetails.map(err => <li key={err.msg}>{err.msg}</li>)}
        </ul>
      )}

      <FormControl>
        <label htmlFor="email">Email</label>
        <Input
          id={'email'}
          name={'email'}
          type={'email'}
          onChange={onChange}
          value={data.email}
        />
      </FormControl>
      <FormControl>
        <label htmlFor="password">Password</label>
        <Input
          id={'password'}
          name={'password'}
          type={'password'}
          onChange={onChange}
          value={data.password}
        />
      </FormControl>
      <Button
        type={'submit'}
        className={'mt-2 mx-auto bg-blue-500 text-white hover:bg-blue-700'}>
        Submit
      </Button>
    </Form>
  );
}
