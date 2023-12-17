import { useTranslation } from 'react-i18next';
import './ProductWrapper.scss';
import Button from '@/components/atoms/Button/Button';
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
import { ProductItem, ProductType } from '@/shared/types/api-type/product';
import { COL_PRODUCT } from '@/shared/types/TableType/table-product';
import PaginationCustom from '@/components/atoms/PaginationCustom/PaginationCustom';

interface ProductWrapperProps {
  dataProduct: ProductType;
  onClickCreateProduct: () => void;
  onClickEditProduct: (product: ProductItem) => void;
  onClickDelete: (product: ProductItem) => void;
  handlePageChange: (event: any, page: number) => void;
}

const ProductWrapper = ({
  dataProduct,
  onClickCreateProduct,
  onClickEditProduct,
  onClickDelete,
  handlePageChange,
}: ProductWrapperProps) => {
  const { t } = useTranslation();

  return (
    <div className="product-wrapper">
      <div className="product-wrapper__container">
        <div className="product-wrapper__container__title">
          {t('table.product.title')}
        </div>
        <Button
          classes="user-wrapper__container__button"
          onClick={onClickCreateProduct}
        >
          {t('table.product.buttonCreate')}
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
            <HeaderTable columns={COL_PRODUCT} i18nIsDynamicList={true} />
            <TableBody>
              {dataProduct.items.map((product, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={product.id}
                  >
                    {COL_PRODUCT.map((column) => {
                      const value = product[column.id!];

                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className="table"
                        >
                          {column.id === 'action' ? (
                            <div className="user-wrapper__action">
                              <div
                                className="user-wrapper__action__edit"
                                onClick={() => onClickEditProduct(product)}
                              >
                                <EditOutlined />
                              </div>
                              <div
                                className="user-wrapper__action__delete"
                                onClick={() => onClickDelete(product)}
                              >
                                <DeleteForeverOutlined />
                              </div>
                            </div>
                          ) : column.id === 'url' ? (
                            <img
                              alt=""
                              width={150}
                              height={100}
                              src={`${product.url}`}
                            />
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
        className="product-wrapper__pagination"
        count={dataProduct.meta.totalPages}
        page={dataProduct.meta.currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default ProductWrapper;
