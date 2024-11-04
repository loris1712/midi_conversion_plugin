import axios from "axios";

export const getFileExtension = (link: string) => {
  return String(link).split('.').pop();
};


export const isFileAvailable = async (url: string) => {
    try {
      await axios.head(url);
      return true;
    } catch (e) {
      return false;
    }
  };


export const isPDF = (str: string) => {
  const ext = getFileExtension(str);
  return ext === 'pdf'
}
