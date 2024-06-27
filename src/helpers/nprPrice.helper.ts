export const getNprPrice = (price: number) => {
  const fixedPointPrice = price?.toFixed(2)
  return `रू.${price}`
}
