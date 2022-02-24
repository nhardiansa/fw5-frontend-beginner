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