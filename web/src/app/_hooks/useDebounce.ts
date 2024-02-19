"use client";

import { useEffect, useRef } from "react";

const useDebounce = <T>(callback: (arg0: T) => void, delay: number) => {
  const timeoutRef = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (value: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(value);
    }, delay);
  };
};

export default useDebounce;
