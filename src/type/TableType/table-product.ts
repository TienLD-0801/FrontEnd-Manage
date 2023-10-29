export interface ColumnProduct {
  id: 'id' | 'productName' | 'categoryName' | 'url' | 'description' | 'action';
  align?: 'left' | 'right' | 'center';
  minWidth?: number;
  label: string;
  width?: number;
  format?: (value: number) => string;
}
export const COL_PRODUCT: ColumnProduct[] = [
  {
    id: 'id',
    label: 'table.column.product.id',
    minWidth: 10,
    width: 100,
    align: 'center',
  },
  {
    id: 'productName',
    label: 'table.column.product.productName',
    minWidth: 10,
    width: 150,
    align: 'center',
  },
  {
    id: 'categoryName',
    label: 'table.column.product.categoryName',
    minWidth: 10,
    width: 150,
    align: 'center',
  },
  {
    id: 'url',
    label: 'table.column.product.urlImg',
    minWidth: 10,
    width: 200,
    align: 'center',
  },
  {
    id: 'description',
    label: 'table.column.product.description',
    minWidth: 10,
    width: 100,
    align: 'center',
  },
  {
    id: 'action',
    label: 'table.column.product.action',
    minWidth: 10,
    width: 100,
    align: 'center',
  },
];
