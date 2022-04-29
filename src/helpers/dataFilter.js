export const clearEmptyObject = (obj) => {
  for (const key in obj) {
    if (obj[key] === "") {
      delete obj[key];
    }
  }

  return obj;
};
