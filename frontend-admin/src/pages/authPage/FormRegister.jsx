import { useContext, useState } from 'react';

import Form from '../../components/ui/Form';
import FormControl from '../../components/ui/FormControl';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { AuthContext } from '../../AuthProvider';

export default function FormRegister() {
  const { fetchAuth, error } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPw: '',
  });
  const pwMatch = form.password === form.confirmPw;

  function onChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!pwMatch) return;

    fetchAuth(form, false);
    if (error) return; // Prevent login if error is defined
    fetchAuth(form);
  }

  return (
    <Form onSubmit={onSubmit}>
      {error && (
        <ul className="border border-red-300 bg-red-100 text-red-800 rounded-md p-3 flex flex-col gap-2 text-sm">
          <p className=" text-center font-semibold text-base">
            {error.message}
          </p>
          {error.errorDetails &&
            error.errorDetails.map(err => <li key={err}>{err}</li>)}
        </ul>
      )}

      <FormControl>
        <label htmlFor="name">Name</label>
        <Input id={'name'} name={'name'} onChange={onChange} />
      </FormControl>
      <FormControl>
        <label htmlFor="email">Email</label>
        <Input id={'email'} name={'email'} type={'email'} onChange={onChange} />
      </FormControl>
      <FormControl>
        <label htmlFor="password">Password</label>
        <Input
          id={'password'}
          name={'password'}
          type={'password'}
          onChange={onChange}
          className={`${!pwMatch ? 'border-red-500' : ''}`}
        />
      </FormControl>
      <FormControl>
        <label htmlFor="confirmPw">Confirm Password</label>
        <Input
          id={'confirmPw'}
          name={'confirmPw'}
          type={'password'}
          onChange={onChange}
          className={`${!pwMatch ? 'border-red-500' : ''}`}
        />
        <p className={`text-sm text-red-500 ${pwMatch ? 'opacity-0' : ''}`}>
          Password did not match
        </p>
      </FormControl>

      <Button
        type={'submit'}
        className={'mt-2 mx-auto bg-blue-500 text-white hover:bg-blue-700'}>
        Submit
      </Button>
    </Form>
  );
}
