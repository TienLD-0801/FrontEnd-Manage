export type DialogCreateCategoryType = {
  id: string;
  type: 'text' | 'number';
  label?: string;
  value: 'categoryName';
  margin?: 'none' | 'dense' | 'normal';
};

export const DATA_DIALOG_CREATE_CATEGORY: DialogCreateCategoryType[] = [
  {
    id: '1',
    type: 'text',
    label: 'dialog.category.create.categoryName',
    value: 'categoryName',
    margin: 'dense',
  },
];

export type DialogEditCategoryType = DialogCreateCategoryType;

export const DATA_DIALOG_EDIT_CATEGORY: DialogEditCategoryType[] = [
  {
    id: '1',
    type: 'text',
    label: 'dialog.category.create.categoryName',
    value: 'categoryName',
    margin: 'dense',
  },
];

export const PAGE_DISABLE_CHANGE = 1;
export const CATEGORY_PAGE = 1;
export const CATEGORY_LIMIT_PAGE = 5;
