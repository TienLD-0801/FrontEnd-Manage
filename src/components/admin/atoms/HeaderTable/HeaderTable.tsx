import { useTranslation } from 'react-i18next';
import { ColumnUser } from '@/type/TableType/table-user';
import { TableCell, TableHead, TableRow } from '@mui/material';
import { ColumnProduct } from '@/type/TableType/table-product';
import { ColumnCategory } from '@/type/TableType/table-category';

import './HeaderTable.scss';

interface HeaderTableProps {
  columns: ColumnUser[] | ColumnProduct[] | ColumnCategory[];
}

const HeaderTable = ({ columns }: HeaderTableProps) => {
  const { t } = useTranslation();
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => {
          return (
            <TableCell
              className="header-table"
              key={column.id}
              align={column.align || 'left'}
              style={{ minWidth: column.minWidth, width: column.width }}
            >
              <div className="header-table__title">{t(column.label)}</div>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default HeaderTable;
