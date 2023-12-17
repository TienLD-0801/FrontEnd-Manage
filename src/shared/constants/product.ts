export type DialogCreateProductType = {
  id: string;
  type: 'text' | 'number';
  label?: string;
  value: 'productName' | 'categoryName' | 'url' | 'description' | 'price';
  margin?: 'none' | 'dense' | 'normal';
  autoComplete?: string;
  isAutoComplete?: boolean;
  isImage?: boolean;
};

export const DATA_DIALOG_CREATE_PRODUCT: DialogCreateProductType[] = [
  {
    id: '1',
    type: 'text',
    label: 'dialog.product.create.nameProduct',
    value: 'productName',
    margin: 'dense',
  },
  {
    id: '2',
    type: 'text',
    label: 'dialog.product.create.categoriesName',
    value: 'categoryName',
    margin: 'dense',
    isAutoComplete: true,
  },
  {
    id: '3',
    type: 'text',
    label: 'dialog.product.create.urlImg',
    value: 'url',
    margin: 'dense',
    isImage: true,
  },
  {
    id: '4',
    type: 'text',
    value: 'description',
    label: 'dialog.product.create.description',
    margin: 'dense',
  },
  {
    id: '5',
    type: 'number',
    label: 'dialog.product.create.price',
    value: 'price',
    margin: 'dense',
  },
];

export type DialogEditProductType = DialogCreateProductType;

export const DATA_DIALOG_EDIT_PRODUCT: DialogEditProductType[] = [
  {
    id: '1',
    type: 'text',
    label: 'dialog.product.edit.nameProduct',
    value: 'productName',
    margin: 'dense',
  },
  {
    id: '2',
    type: 'text',
    label: 'dialog.product.edit.categoriesName',
    value: 'categoryName',
    margin: 'dense',
    isAutoComplete: true,
  },
  {
    id: '3',
    type: 'text',
    label: 'dialog.product.edit.urlImg',
    value: 'url',
    margin: 'dense',
    isImage: true,
  },
  {
    id: '4',
    type: 'text',
    value: 'description',
    label: 'dialog.product.edit.description',
    margin: 'dense',
  },
  {
    id: '5',
    type: 'number',
    label: 'dialog.product.edit.price',
    value: 'price',
    margin: 'dense',
  },
];

export const PRODUCT_PAGE = 1;
export const PRODUCT_LIMIT_PAGE = 20;
