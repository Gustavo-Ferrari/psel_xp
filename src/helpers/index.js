export const parse = (key) => {
  const test = localStorage.getItem(key);
  if (test) {
    return JSON.parse(test);
  }
  return test;
};

export const stringfy = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export default { parse, stringfy };
