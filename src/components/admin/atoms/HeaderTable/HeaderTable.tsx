import { TableHead, TableRow, TableCell } from '@mui/material';
import { ColumnUser, ColumnProduct } from '@/type/TableType/table_type';
import './HeaderTable.scss';
import { useTranslation } from 'react-i18next';

interface HeaderTableProps {
  columns: readonly ColumnUser[] | ColumnProduct[];
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
