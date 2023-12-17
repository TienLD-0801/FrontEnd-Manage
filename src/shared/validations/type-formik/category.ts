import { FormikProps } from 'formik';

export type ValidationCreateCategoryType = FormikProps<{
  categoryName: string;
}>;

export type ValidationEditCategoryType = FormikProps<{
  id: string;
  categoryName: string;
}>;
