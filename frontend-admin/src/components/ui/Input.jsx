import PropTypes from 'prop-types';

const Input = ({ className, ...props }) => {
  const base = 'p-1 rounded-md border-2 bg-slate-50';

  return <input className={`${base} ${className}`} {...props} required />;
};

export default Input;

Input.propTypes = {
  className: PropTypes.string,
};
