"use client";

import { LOCAL_STORAGE_PREFIX } from "@/constants/local-storage";
import { subscribe, unsubscribe } from "@/web-api/event";
import { setToLocalStorage } from "@/web-api/store";
import { useEffect, useState } from "react";

const useStoreState = <T extends unknown>(
  key: string,
  initialValue?: T | undefined,
  onChange?: (newValue: T | undefined) => void
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] => {
  key = `${LOCAL_STORAGE_PREFIX}-${key}`;

  // to silence nextjs RSC errors
  const storedValue =
    typeof localStorage !== "undefined" && !!localStorage.getItem(key)
      ? (JSON.parse(localStorage.getItem(key) as string) as T)
      : initialValue;

  const [state, setState] = useState<T | undefined>(storedValue);

  const eventName = `${LOCAL_STORAGE_PREFIX}-${key}`;

  useEffect(() => {
    if (state) {
      setToLocalStorage(key, eventName, JSON.stringify(state));
    } else {
      setToLocalStorage(key, eventName, undefined);
    }
    if (onChange) {
      onChange(state);
    }
  }, [key, state, onChange, eventName]);

  useEffect(() => {
    const handleStorageChange = (event: CustomEvent) => {
      if (event.type === eventName) {
        const newValue = event.detail.key as T | undefined;

        setState(newValue);
        if (onChange) {
          onChange(newValue);
        }
      }
    };

    subscribe(eventName, handleStorageChange as never);

    return () => {
      unsubscribe(eventName, handleStorageChange as never);
    };
  }, [eventName, key, onChange]);

  return [state, setState];
};

export default useStoreState;
