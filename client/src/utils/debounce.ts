export default function debounce(func: ReturnType<any>, timeout = 300) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: Array<any>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
