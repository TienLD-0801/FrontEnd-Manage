import * as Yup from 'yup';

// validation create category form validation
export const validationCreateCategorySchema = Yup.object().shape({
  categoryName: Yup.string().required('Category name is required'),
});

// validation edit category form validation
export const validationEditCategorySchema = Yup.object().shape({
  categoryName: Yup.string().required('Category name is required'),
});
