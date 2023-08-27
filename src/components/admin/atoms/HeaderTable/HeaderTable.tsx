import { TableHead, TableRow, TableCell } from '@mui/material';
import { ColumnUser, ColumnProduct } from '@/type/TableType/table_type';
import './HeaderTable.scss';

interface HeaderTableProps {
  columns: readonly ColumnUser[] | ColumnProduct[];
}

const HeaderTable = ({ columns }: HeaderTableProps) => {
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
              <div className="header-table__title">{column.label}</div>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default HeaderTable;
