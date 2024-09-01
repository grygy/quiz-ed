"use client";

import { LOCAL_STORAGE_PREFIX } from "@/constants/local-storage";
import { subscribe, unsubscribe } from "@/web-api/event";
import { setToLocalStorage } from "@/web-api/store";
import { useEffect, useState } from "react";

// Custom hook for managing state in local storage with change listener
const useStoreState = (
  key: string,
  initialValue?: string | undefined,
  onChange?: (newValue: string | undefined) => void
): [
  string | undefined,
  React.Dispatch<React.SetStateAction<string | undefined>>
] => {
  // Retrieve state from local storage or use the initial value
  const storedValue =
    typeof localStorage === "undefined"
      ? undefined
      : localStorage.getItem(`${LOCAL_STORAGE_PREFIX}-${key}`) || initialValue;

  // State and setter function
  const [state, setState] = useState<string | undefined>(storedValue);

  useEffect(() => {
    setState(storedValue);
  }, [storedValue]);

  const eventName = `${LOCAL_STORAGE_PREFIX}-${key}`;
  key = `${LOCAL_STORAGE_PREFIX}-${key}`;

  // Update local storage when state changes
  useEffect(() => {
    if (state) {
      setToLocalStorage(key, eventName, state.toString());
    } else {
      setToLocalStorage(key, eventName, undefined);
    }
    // Call the onChange callback when state changes
    if (onChange) {
      onChange(state);
    }
  }, [key, state, onChange, eventName]);

  // Listen for changes in local storage and update state accordingly
  useEffect(() => {
    const handleStorageChange = (event: CustomEvent) => {
      if (event.type === eventName) {
        const newValue = event.detail.key as string | undefined;

        setState(newValue);
        // Call the onChange callback when storage changes
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
