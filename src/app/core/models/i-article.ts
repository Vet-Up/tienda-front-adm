export interface IArticle {
  productId: number;
  name: string;
  productDescription: string;
  basePrice: number; // Precio base
  discount: number; 
  price: number; 
  pictureProduct: string;
  brand: string;
  categoryId: number;
  stock: number;
  averageRating: number; 
}
