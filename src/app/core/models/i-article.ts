export interface IArticle {
  productId: number;
  name: string;
  productDescription: string;
  basePrice: number; // Precio base
  discountedPrice: number; // Porcentaje de descuento (0-100)
  price: number; // Precio final calculado
  pictureProduct: string;
  brand: string;
  categoryId: number;
}
