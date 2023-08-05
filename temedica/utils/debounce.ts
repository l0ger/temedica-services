type Debounce<R = void> = (
  fn: (...args: any) => R,
  ms: number,
) => (this: any, ...args: any) => void;

export const debounce: Debounce = (fn, ms) => {
  let timer: NodeJS.Timeout;
  return function (this: any, ...args: any) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
};
