export const capitalize = (str, splitSubStr = ' ', joinStr = ' ') => {
  if (typeof str !== 'string') return '';

  return str
      .split(splitSubStr)
      .map(substr => substr.charAt(0).toUpperCase() + substr.slice(1))
      .join(joinStr);
};
