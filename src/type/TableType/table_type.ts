export interface ColumnProduct {
  id: 'id' | 'name';
  align?: 'left' | 'right' | 'center';
  minWidth?: number;
  label: string;
  width?: number;
  format?: (value: number) => string;
}

export interface ColumnUser {
  id?:
    | 'id'
    | 'name'
    | 'email'
    | 'date_of_birth'
    | 'card_id'
    | 'phone'
    | 'role'
    | 'action';
  align?: 'left' | 'right' | 'center';
  minWidth?: number;
  label: string;
  width?: number;
  format?: (value: number) => string;
}

export const COL_USERS: readonly ColumnUser[] = [
  {
    id: 'id',
    label: 'table.column.id',
    minWidth: 10,
    width: 100,
    align: 'center',
  },
  {
    id: 'name',
    label: 'table.column.name',
    minWidth: 10,
    width: 150,
    align: 'center',
  },
  {
    id: 'email',
    label: 'table.column.email',
    minWidth: 10,
    width: 200,
    align: 'center',
  },
  {
    id: 'date_of_birth',
    label: 'table.column.birthDay',
    minWidth: 10,
    width: 100,
    align: 'center',
  },
  {
    id: 'card_id',
    label: 'table.column.cardNumber',
    minWidth: 10,
    width: 50,
    align: 'center',
  },
  {
    id: 'phone',
    label: 'table.column.phone',
    minWidth: 10,
    width: 50,
    align: 'center',
  },
  {
    id: 'role',
    label: 'table.column.role',
    minWidth: 10,
    width: 100,
    align: 'center',
  },
  {
    id: 'action',
    label: 'table.column.action',
    minWidth: 10,
    width: 100,
    align: 'center',
  },
];
