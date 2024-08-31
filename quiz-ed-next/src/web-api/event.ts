export const subscribe = (
  eventName: string,
  listener: (event: Event) => void
) => {
  document.addEventListener(eventName, listener);
};

export const unsubscribe = (
  eventName: string,
  listener: (event: Event) => void
) => {
  document.removeEventListener(eventName, listener);
};

export const publish = (eventName: string, data: any) => {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
};
