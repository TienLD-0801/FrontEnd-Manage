import { FormikProps } from 'formik';

export type ValidationCreateUserType = FormikProps<{
  name: string;
  email: string;
  password: string;
  date_of_birth: string;
  card_id: string;
  phone: string;
}>;

export type ValidationEditUserType = FormikProps<{
  id: string;
  name: string;
  email: string;
  date_of_birth: string;
  card_id: string;
  phone: string;
  role: number;
}>;
