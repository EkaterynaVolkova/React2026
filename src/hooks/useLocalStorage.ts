import { useState } from 'react';

const useLocalStorage = <T>(key: string) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : '';
  });

  const saveValue = (data: T) => {
    setValue(data);
    localStorage.setItem(key, JSON.stringify(data));
  };

  return [value, saveValue];
};

export default useLocalStorage;
