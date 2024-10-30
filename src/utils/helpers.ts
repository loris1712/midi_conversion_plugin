export const getFileExtension = (link: string) => {
  return String(link).split('.').pop();
};
