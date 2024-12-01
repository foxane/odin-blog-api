export function formatDate(dateStr) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  return new Date(dateStr).toLocaleDateString(undefined, options);
}
