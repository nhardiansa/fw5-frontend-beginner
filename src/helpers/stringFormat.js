export const priceFormat = (price) => {
  const res = String(price).split('').reverse();
  for (let i = 3; i < res.length; i += 4) {
    res.splice(i, 0, '.');
  }

  return res.reverse().join('');
};

export const queryFormat = (query) => {
  return query.replace(/\s/g, '+');
};

export const capitalize = (str) => {
  return str.split(' ').map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ');
};

export const dateFormatter = (date, input = false) => {
  if (input) {
    // console.log(date.split('-').reverse().join('/'), 'frontend');
    return date.split('-').reverse().join('/');
  }
  let result = new Date(date).toLocaleString('id-ID').split(' ')[0];
  result = result.split(/\D+/g).reverse().map(el => el.length === 1 ? `0${el}` : el).join('-');
  // console.log(result, 'backend');
  return result;
};
