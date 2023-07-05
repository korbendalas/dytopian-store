export type ProductsPaginated = {
  productsList: Products[];
  totalCount: number;
};

export type Products = {
  id: number;
  uuid: string;
  title: string;
  price: number;
  discountPrice: number | null;
  quantity: number;
  sold: number;
  smallDescription: string;
  largeDescription: string;
  specification: string;
};
