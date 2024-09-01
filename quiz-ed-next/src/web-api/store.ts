import { publish } from "./event";

export const setToLocalStorage = (
  key: string,
  eventName: string,
  value: string | undefined
) => {
  if (typeof localStorage === "undefined") {
    return;
  }
  if (!value) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, value);
  }
  publish(eventName, { key: value });
};

export const storeObjectToLocalStorage = <T extends unknown>(
  key: string,
  value: T | undefined
) => {
  if (typeof localStorage === "undefined") {
    return;
  }
  if (!value) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getObjectFromLocalStorage = <T extends unknown>(
  key: string
): T | undefined => {
  if (typeof localStorage === "undefined") {
    return undefined;
  }
  const item = localStorage.getItem(key);
  if (!item) {
    return undefined;
  }
  return JSON.parse(item) as T;
};
