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

export const COL_USERS: ColumnUser[] = [
  {
    id: 'id',
    label: 'table.column.user.id',
    minWidth: 10,
    width: 100,
    align: 'center',
  },
  {
    id: 'name',
    label: 'table.column.user.name',
    minWidth: 10,
    width: 150,
    align: 'center',
  },
  {
    id: 'email',
    label: 'table.column.user.email',
    minWidth: 10,
    width: 200,
    align: 'center',
  },
  {
    id: 'date_of_birth',
    label: 'table.column.user.birthDay',
    minWidth: 10,
    width: 100,
    align: 'center',
  },
  {
    id: 'card_id',
    label: 'table.column.user.cardNumber',
    minWidth: 10,
    width: 50,
    align: 'center',
  },
  {
    id: 'phone',
    label: 'table.column.user.phone',
    minWidth: 10,
    width: 50,
    align: 'center',
  },
  {
    id: 'role',
    label: 'table.column.user.role',
    minWidth: 10,
    width: 100,
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
