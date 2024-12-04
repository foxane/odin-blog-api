import PropTypes from 'prop-types';

export default function ErrorPage({ message = 'Something went wrong' }) {
  return <p className="text-3xl font-bold text-red-500">{message}</p>;
}

ErrorPage.propTypes = {
  message: PropTypes.string,
};
