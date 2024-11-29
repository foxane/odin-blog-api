import Form from './ui/Form';
import FormControl from './ui/FormControl';
import Input from './ui/Input';
import Button from './ui/Button';

export default function FormLogin() {
  return (
    <Form>
      <FormControl>
        <label htmlFor="email">Email</label>
        <Input type={'email'} id={'email'} />
      </FormControl>
      <FormControl>
        <label htmlFor="password">Password</label>
        <Input type={'password'} id={'password'} />
      </FormControl>

      <Button
        type={'submit'}
        className={'bg-blue-600 text-white mt-2 hover:bg-blue-700 mx-auto'}>
        Submit
      </Button>
    </Form>
  );
}
