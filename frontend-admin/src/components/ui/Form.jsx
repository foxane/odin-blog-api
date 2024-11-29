import PropTypes from 'prop-types';

export default function Form({ children, ...props }) {
  return (
    <form className="p-2 flex flex-col gap-2" {...props}>
      {children}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node,
};
