import * as Yup from 'yup';

// validation create product form validation
export const validationCreateProductSchema = Yup.object().shape({
  productName: Yup.string().required('Name is required'),
  categoryName: Yup.string().required('categoryName is required'),
  urlImg: Yup.string().required('urlImg is required'),
  description: Yup.string().required('description is required'),
  price: Yup.string().required('price is required'),
});

// validation edit product form validation
export const validationEditProductSchema = Yup.object().shape({
  productName: Yup.string().required('Name is required'),
  categoryName: Yup.string().required('categoryName is required'),
  urlImg: Yup.string().required('urlImg is required'),
  description: Yup.string().required('description is required'),
  price: Yup.string().required('price is required'),
});
