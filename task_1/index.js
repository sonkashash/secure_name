import { encoded, translations } from "./data.js";

console.log("Let's rock");
console.log(encoded, translations);

export const encodeFunc = (encoded, translations) => {
  const res = [];

  for (const obj of encoded) {
    const newMap = new Map();
    const translationsMap = new Map();
    const resObj = {};

    for (let key in obj) {
      newMap.set(key, obj[key]);
    }
    for (let key in translations) {
      translationsMap.set(key, translations[key]);
    }
    for (let key of newMap.keys()) {
      let value = newMap.get(`${key}`);
      if (translationsMap.has(value)) {
        resObj[key] = translationsMap.get(`${value}`);
      } else {
        resObj[key] = value;
      }
    }
    res.push(resObj);
  }
  return res;
};

export const findUnique = (encoded, translations) => {
  let uniqueStack = [];
  const translationsMap = new Map();
  const countItems = {};

  for (let key in translations) {
    translationsMap.set(key, translations[key]);
  }
  for (const obj of encoded) {
    Object.values(obj).forEach((value) => {
      if (translationsMap.has(value)) {
        uniqueStack.push(value);
      }
    });
  }
  for (const item of uniqueStack) {
    countItems[item] = countItems[item] ? countItems[item] + 1 : 1;
  }
  const result = Object.keys(countItems).filter(
    (item) => countItems[item] === 1
  );
  return result;
};

// console.log(decoded)
