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
