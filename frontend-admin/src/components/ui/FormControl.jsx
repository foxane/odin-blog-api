import PropTypes from 'prop-types';

const FormControl = ({ children, className }) => {
  const base = 'flex flex-col gap-1 font-semibold';

  return <div className={`${base} ${className}`}>{children}</div>;
};

export default FormControl;

FormControl.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
