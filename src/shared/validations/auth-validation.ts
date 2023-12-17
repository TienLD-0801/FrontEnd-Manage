import * as Yup from 'yup';

// validation create user form validation
export const validationCreateUserSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  date_of_birth: Yup.date().required('Date is required'),
  card_id: Yup.string().required('CMND or CCCD is required'),
  phone: Yup.number().required('Phone is required'),
});

export const validationEditUserSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  date_of_birth: Yup.date().required('Date is required'),
  card_id: Yup.string().required('CMND or CCCD is required'),
  phone: Yup.string().required('Phone is required'),
});

// validation login form validation
export const validationLoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});
