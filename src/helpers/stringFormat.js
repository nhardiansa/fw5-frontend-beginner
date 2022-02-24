export const priceFormat = (price) => {
  let res = String(price).split('').reverse()
  for (let i = 3; i < res.length; i += 4) {
    res.splice(i, 0, '.')
  }

  return res.reverse().join('')
}

export const queryFormat = (query) => {
  return query.replace(/\s/g, '+')
}

export const capitalize = (str) => {
  return str.split(' ').map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')
}