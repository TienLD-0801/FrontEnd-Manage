import { FormikProps } from 'formik';

export type ValidationCreateProductType = FormikProps<{
  productName: string;
  categoryName: string;
  urlImg: string;
  description: string;
  price: number;
}>;

export type ValidationEditProductType = FormikProps<{
  id?: string;
  productName: string;
  categoryName: string;
  urlImg: string;
  description: string;
  price: number;
}>;
