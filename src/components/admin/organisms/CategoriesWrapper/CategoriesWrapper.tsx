import Button from '@/components/atoms/Button/Button';
import './CategoriesWrapper.scss';
import { useTranslation } from 'react-i18next';
import { CategoriesType, CategoriesItem } from '@/shared/types/api-type/category';
import { EditOutlined, DeleteForeverOutlined } from '@mui/icons-material';
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import HeaderTable from '@/components/admin/atoms/HeaderTable/HeaderTable';
import { COL_CATEGORIES } from '@/shared/types/TableType/table-category';
import PaginationCustom from '@/components/atoms/PaginationCustom/PaginationCustom';

interface CategoriesWrapperProps {
  dataCategory: CategoriesType;
  onClickDelete: (category: CategoriesItem) => void;
  onClickCreate: () => void;
  onClickEdit: (category: CategoriesItem) => void;
  handlePageChange: (event: any, page: number) => void;
}

const CategoriesWrapper = ({
  dataCategory,
  onClickDelete,
  onClickCreate,
  onClickEdit,
  handlePageChange,
}: CategoriesWrapperProps) => {
  const { t } = useTranslation();

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
              {dataCategory.items.map((category, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={category.id!}
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
                                onClick={() => onClickEdit(category)}
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
      </Paper>
      <PaginationCustom
        className="category-wrapper__pagination"
        count={dataCategory.meta.totalPages}
        page={dataCategory.meta.currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default CategoriesWrapper;
