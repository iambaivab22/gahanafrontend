export const getNprPrice = (price: number) => {
  console.log(price, 'price from data')
  if (
    price === 0 ||
    price === undefined ||
    price === null ||
    Number.isNaN(price)
  ) {
    return 'रू.0'
  }

  const fixedPointPrice = price?.toFixed(2)
  return `रू.${fixedPointPrice ?? '-'}`
}
