export const getUserTokenFromLocalStorage = async () => {
  const data = await window?.localStorage?.usertoken;
  return data;
};
export const setDataFromToStorage = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};
export const removeDataFromToStorage = (key: string) => {
  window.localStorage.removeItem(key);
};
