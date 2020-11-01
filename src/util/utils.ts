import * as _ from "lodash";

export function delay(ms: number)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getRandomString(length: number = 8) {
  let s = "";
  const randomChar = () => {
    const n = Math.floor(Math.random() * 62);
    if (n < 10) {
      return n;
    } // 1-10
    if (n < 36) {
      return String.fromCharCode(n + 55);
    } // A-Z
    return String.fromCharCode(n + 61); // a-z
  };
  while (length--) {
    s += randomChar();
  }
  return s;
}
