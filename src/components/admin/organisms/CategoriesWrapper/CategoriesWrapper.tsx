import React from 'react';
import Button from '@/components/atoms/Button/Button';
import './CategoriesWrapper.scss';
import { useTranslation } from 'react-i18next';
import { CategoriesType } from '@/api-type/category';
import { EditOutlined, DeleteForeverOutlined } from '@mui/icons-material';
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from '@mui/material';
import HeaderTable from '../../atoms/HeaderTable/HeaderTable';
import { useState } from 'react';
import { COL_CATEGORIES } from '@/type/TableType/table-category';

interface CategoriesWrapperProps {
  dataCategory: CategoriesType[];
  onClickDelete: (category: CategoriesType) => void;
  onClickCreate: () => void;
}

const CategoriesWrapper = ({
  dataCategory,
  onClickDelete,
  onClickCreate,
}: CategoriesWrapperProps) => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="category-wrapper">
      <div className="category-wrapper__container">
        <div className="category-wrapper__container__title">
          {t('table.category.title')}
        </div>
        <Button
          classes="category-wrapper__container__button"
          onClick={onClickCreate}
        >
          {t('table.category.buttonCreate')}
        </Button>
      </div>
      <Paper
        sx={{
          width: '100%',
          overflow: 'hidden',
          borderRadius: 2,
          border: 'none',
        }}
      >
        <TableContainer sx={{ maxHeight: 480 }}>
          <Table stickyHeader sx={{ m: 0 }}>
            <HeaderTable columns={COL_CATEGORIES} i18nIsDynamicList={true} />
            <TableBody>
              {dataCategory
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((category, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={category.id.toString()}
                    >
                      {COL_CATEGORIES.map((column) => {
                        const value = category[column.id!];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            className="table"
                          >
                            {column.id === 'action' ? (
                              <div className="category-wrapper__action">
                                <div
                                  className="category-wrapper__action__edit"
                                  // onClick={() => onClickEdit(user)}
                                >
                                  <EditOutlined />
                                </div>
                                <div
                                  className="category-wrapper__action__delete"
                                  onClick={() => onClickDelete(category)}
                                >
                                  <DeleteForeverOutlined />
                                </div>
                              </div>
                            ) : column.id === 'id' ? (
                              index + 1
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          labelRowsPerPage={t('table.rowPerPage')}
          count={dataCategory.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default CategoriesWrapper;
