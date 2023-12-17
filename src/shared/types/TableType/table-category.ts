export interface ColumnCategory {
  id?: 'id' | 'categoryName' | 'action';
  align?: 'left' | 'right' | 'center';
  minWidth?: number;
  label: string;
  width?: number;
  format?: (value: number) => string;
}

export const COL_CATEGORIES: ColumnCategory[] = [
  {
    id: 'id',
    label: 'table.column.category.id',
    minWidth: 10,
    width: 100,
    align: 'center',
  },
  {
    id: 'categoryName',
    label: 'table.column.category.categoryName',
    minWidth: 10,
    width: 150,
    align: 'center',
  },
  {
    id: 'action',
    label: 'table.column.user.action',
    minWidth: 10,
    width: 100,
    align: 'center',
  },
];
