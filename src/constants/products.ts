export const PRODUCT_CATEGORIES = [
  'T-Shirts',
  'Jeans',
  'Dresses',
  'Jackets',
  'Accessories',
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number];