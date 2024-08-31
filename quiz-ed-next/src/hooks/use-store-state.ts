import { LOCAL_STORAGE_PREFIX } from "@/constants/local-storage";
import { setToLocalStorage } from "@/web-api/store";
import { subscribe, unsubscribe } from "diagnostics_channel";
import { useEffect, useState } from "react";

const useStoreState = (
  key: string,
  initialValue?: string | undefined,
  onChange?: (newValue: string | undefined) => void
): [
  string | undefined,
  React.Dispatch<React.SetStateAction<string | undefined>>
] => {
  const storedValue =
    (localStorage.getItem(key) as string | undefined) || initialValue;

  const [state, setState] = useState<string | undefined>(storedValue);

  const eventName = `${LOCAL_STORAGE_PREFIX}-${key}`;

  useEffect(() => {
    if (state) {
      setToLocalStorage(key, eventName, state.toString());
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
        const newValue = event.detail.key as string | undefined;

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
