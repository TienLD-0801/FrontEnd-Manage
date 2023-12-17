export type ProductItem = {
  id?: string;
  productName: string;
  categoryName: string;
  url: string;
  description: string;
  price: number;
  action?: undefined;
};

export type ProductType = {
  items: ProductItem[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    nextPage: number;
    previousPage: number;
  };
};

export type ProductAll = {
  result: ProductType;
};
