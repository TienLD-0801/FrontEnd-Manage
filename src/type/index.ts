export type DataProductType = {
  id: number;
  productName: string;
  price: number;
  description: string;
  url: string;
  nameImg: string;
};

export interface ColumnProduct {
  id: 'productName' | 'categoryId' | 'url' | 'nameImg' | 'price';
  label: string;
}
