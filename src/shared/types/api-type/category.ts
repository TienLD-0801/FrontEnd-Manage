export type CategoriesItem = {
  id?: string;
  categoryName: string;
  isProductUse?: boolean;
  action?: undefined;
};

export type CategoriesType = {
  items: CategoriesItem[];
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

export type CategoriesAll = {
  result: CategoriesType;
};
