'use client';

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

  const saveValue = (data: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        typeof data === 'function' ? (data as (val: T) => T)(value) : data;
      setValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [value, saveValue] as const;
};

export default useLocalStorage;
