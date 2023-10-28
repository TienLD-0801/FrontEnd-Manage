export type DataProductType = {
  id: number;
  productName: string;
  price: number;
  description: string;
  urlImg: string;
  nameImg: string;
};

export interface ColumnProduct {
  id: 'productName' | 'categoryId' | 'urlImg' | 'nameImg' | 'price';
  label: string;
}
