import TableComponent from '@/components/molecules/TableComponent/TableComponent';
import { ColumnProduct, DataProductType } from '@/type';

//TODO
const columns: ColumnProduct[] = [
  { id: 'productName', label: 'Product Name' },

  { id: 'price', label: 'Price' },

  {
    id: 'categoryId',
    label: 'Category',
  },
  {
    id: 'urlImg',
    label: 'Image',
  },
  {
    id: 'nameImg',
    label: 'Image Name',
  },
];

interface ProductWrapperProps {
  product: DataProductType[];
}

//TODO
const ProductWrapper = ({ product }: ProductWrapperProps) => {
  return (
    <div>
      <h1 className="text_title">Manager Product</h1>
      <TableComponent />
    </div>
  );
};

export default ProductWrapper;
