/**
 * Calculates order totals from cart items.
 * @param {Array<{price: number, quantity: number}>} items
 * @returns {{ subtotal: number, tax: number, shipping: number, total: number }}
 */
export function calculateOrderTotals(items) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const tax = Math.round(subtotal * 0.03) // 3% estimated tax
  const shipping = 0 // Free shipping
  const total = subtotal + tax + shipping

  return { subtotal, tax, shipping, total }
}
