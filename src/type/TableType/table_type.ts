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
  { id: 'id', label: 'ID', minWidth: 10, width: 100, align: 'center' },
  { id: 'name', label: 'Name', minWidth: 10, width: 150, align: 'center' },
  { id: 'email', label: 'Email', minWidth: 10, width: 200, align: 'center' },
  {
    id: 'date_of_birth',
    label: 'Birth Day',
    minWidth: 10,
    width: 100,
    align: 'center',
  },
  {
    id: 'card_id',
    label: 'CMND/CCCD',
    minWidth: 10,
    width: 50,
    align: 'center',
  },
  { id: 'phone', label: 'Phone', minWidth: 10, width: 50, align: 'center' },
  { id: 'role', label: 'Role', minWidth: 10, width: 100, align: 'center' },
  { id: 'action', label: 'Actions', minWidth: 10, width: 100, align: 'center' },
];
