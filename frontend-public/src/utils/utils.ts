export const convertAuth = (val: number): string =>
  ['Normal user', 'Author', 'Admin'][val - 1] || 'Unknown role';
