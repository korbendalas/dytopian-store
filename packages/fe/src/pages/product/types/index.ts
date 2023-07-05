export type Product = {
  id: number;
  uuid: string;
  title: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  sold: number;
  smallDescription: string;
  largeDescription: string;
  specification: string;
  categoryId: number;
  brand: Brand;
  category: Category;
  images: ProductImage[];
};

export type Brand = {
  id: number;
  uuid: string;
  name: string;
};

export type Category = {
  id: number;
  name: string;
  parentId: number;
};

export type ProductImage = {
  id: number;
  uuid: string;
  imgUrl: string;
  cover: boolean;
  product_id: number;
};
