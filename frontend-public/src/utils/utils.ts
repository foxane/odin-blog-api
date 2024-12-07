export const convertAuth = (val: number): string =>
  ['Normal user', 'Author', 'Admin'][val - 1] || 'Unknown role';

export const formatDate = (date: string, options?: object): string =>
  new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  });
