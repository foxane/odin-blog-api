import PropTypes from 'prop-types';

export default function Button({ className, children, ...props }) {
  const base = 'border border-slate-400 py-1 px-4 rounded-md';

  return (
    <button className={`${base} ${className}`} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
