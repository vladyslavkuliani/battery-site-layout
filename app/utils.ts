export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(amount)
}

export function formatFeet(number: number) {
  return `${number}FT`;
}
