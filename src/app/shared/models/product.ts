import { ProductOptions } from "./productOptions";

export class Product {
  $key: string;
  productId: number;
  productName: string;
  productCategory: string;
  productPrice: number;
  productDescription: string;
  productImageUrl: string;
  productAdded: number;
  productQuantity: number;
  ratings: number;
  favourite: boolean;
  productSeller: string;
  noteForSeller: string;
  productOption: ProductOptions[]
}
