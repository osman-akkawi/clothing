export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const calculateTotal = (items: { price: number; quantity: number }[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};