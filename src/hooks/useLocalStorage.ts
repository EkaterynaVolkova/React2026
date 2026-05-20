import { useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const saveValue = (data: T) => {
    try {
      setValue(data);
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };

  return [value, saveValue] as const;
};

export default useLocalStorage;
