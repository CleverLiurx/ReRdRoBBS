import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const cleanObject = (object: object) => {
  const result = { ...object }; // Object.assign({}, object)
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化后设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // useEffect里的return会在上一个useEffect处理完之后在运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
