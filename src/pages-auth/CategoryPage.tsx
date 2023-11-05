import { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import API from '@/services/axiosClient';
import { Container } from '@mui/material';
import { CategoriesType } from '@/api-type/category';
import { LoadingContext } from '@/context/LoadingContext';
import { AlertDialogContext } from '@/context/AlertDialogContext';
import DashboardWrapper from '@/components/admin/organisms/DashboardWrapper/DashboardWrapper';
import CategoriesWrapper from '@/components/admin/organisms/CategoriesWrapper/CategoriesWrapper';
import FormCategory from '@/components/admin/organisms/FormCategory/FormCategory';
import {
  DATA_DIALOG_CREATE_CATEGORY,
  DATA_DIALOG_EDIT_CATEGORY,
} from '@/constants/category';
import {
  ValidationCreateCategoryType,
  ValidationEditCategoryType,
} from '@/validations/type-formik/category';
import { useFormik } from 'formik';
import {
  validationCreateCategorySchema,
  validationEditCategorySchema,
} from '@/validations/categories-validation';
import { ProductType } from '@/api-type/product';

const CategoryPage = () => {
  const preloader = useContext(LoadingContext);
  const alertDialog = useContext(AlertDialogContext);
  const [dataCategory, setDataCategory] = useState<CategoriesType[]>([]);
  const [dataProduct, setDataProduct] = useState<ProductType[]>([]);
  const [isOpenDeleteCategory, setIsOpenDeleteCategory] =
    useState<boolean>(false);
  const [isOpenCreateCategory, setIsOpenCreateCategory] =
    useState<boolean>(false);
  const [isOpenWarning, setIsOpenWarning] = useState<boolean>(false);
  const [isOpenEditCategory, setIsOpenEditCategory] = useState<boolean>(false);
  const [dataDeleteCategory, setDataDeleteCategory] = useState<{
    id: string;
    categoryName: string;
  }>({
    id: '',
    categoryName: '',
  });

  // validation edit category hook
  const validationEditCategory: ValidationEditCategoryType = useFormik({
    initialValues: {
      id: '',
      categoryName: '',
    },
    validationSchema: validationEditCategorySchema,
    onSubmit: (category: CategoriesType) => handleSaveEditCategory(category),
  });

  // validation create category hook
  const validationCreateCategory: ValidationCreateCategoryType = useFormik({
    initialValues: {
      categoryName: '',
    },
    validationSchema: validationCreateCategorySchema,
    onSubmit: (category: CategoriesType) => handleSaveCreateCategory(category),
  });

  useEffect(() => {
    getProduct();
    getCategories();
  }, []);

  // call api get data product
  const getProduct = async () => {
    try {
      preloader.show();
      const response = await API.apiGetProduct();
      const { result } = response.data;
      setDataProduct(result);
    } catch (error) {
      const message = _.get(error, 'message', JSON.stringify(error));
      alertDialog.show(message, false);
    } finally {
      preloader.hidden();
    }
  };

  // get all category
  const getCategories = async () => {
    try {
      preloader.show();
      const response = await API.apiGetCategory();
      const { result } = response.data;
      setDataCategory(result);
    } catch (error) {
      const message = _.get(error, 'message', JSON.stringify(error));
      alertDialog.show(message, false);
    } finally {
      preloader.hidden();
    }
  };

  // handle call api create category
  const handleSaveCreateCategory = async (category: CategoriesType) => {
    // params call api create category
    const paramsCategory = {
      categoryName: category.categoryName,
    };

    try {
      preloader.show();
      const response = await API.apiCreateCategory(paramsCategory);
      await getCategories();
      const { message } = response.data;
      setIsOpenCreateCategory(false);
      alertDialog.show(message, true);
    } catch (error) {
      const message = _.get(error, 'message', JSON.stringify(error));
      alertDialog.show(message, false);
    } finally {
      preloader.hidden();
    }
  };

  // handle call api update category
  const handleSaveEditCategory = async (category: CategoriesType) => {
    // params call api create category
    const paramsCategory = {
      categoryName: category.categoryName,
    };

    try {
      preloader.show();
      const response = await API.apiUpdateCategory(
        Number(category.id),
        paramsCategory,
      );
      await getCategories();
      const { message } = response.data;
      setIsOpenEditCategory(false);
      alertDialog.show(message, true);
    } catch (error) {
      const message = _.get(error, 'message', JSON.stringify(error));
      alertDialog.show(message, false);
    } finally {
      preloader.hidden();
    }
  };

  // handle agree delete category
  const handleAgreeDeleteCategory = async () => {
    try {
      preloader.show();
      const response = await API.apiDeleteCategory(
        Number(dataDeleteCategory.id),
      );
      await getCategories();
      const { message } = response.data;
      setIsOpenDeleteCategory(false);
      alertDialog.show(message, true);
    } catch (error) {
      const message = _.get(error, 'message', JSON.stringify(error));
      alertDialog.show(message, false);
    } finally {
      preloader.hidden();
    }
  };

  // handle show dialog create category
  const onClickCreateProduct = () => {
    validationCreateCategory.resetForm();
    setIsOpenCreateCategory(true);
  };

  const onClickEditCategory = (category: CategoriesType) => {
    validationEditCategory.resetForm();
    validationEditCategory.setValues({
      id: category.id,
      categoryName: category.categoryName,
    });
    setIsOpenEditCategory(true);
  };

  // handle show dialog delete category
  const onClickDeleteCategory = (category: CategoriesType) => {
    const isProductUse = _.findIndex(
      dataProduct,
      (product) => product.categoryName === category.categoryName,
    );

    if (!isProductUse) {
      setIsOpenWarning(true);
    } else {
      setDataDeleteCategory({
        id: category.id!,
        categoryName: category.categoryName,
      });
      setIsOpenDeleteCategory(true);
    }
  };

  return (
    <Container id="category">
      <DashboardWrapper>
        <CategoriesWrapper
          onClickDelete={(category) => onClickDeleteCategory(category)}
          onClickEdit={(category) => onClickEditCategory(category)}
          dataCategory={dataCategory ?? []}
          onClickCreate={onClickCreateProduct}
        />
      </DashboardWrapper>
      <FormCategory
        validationCreateCategory={validationCreateCategory}
        isOpenCreateCategory={isOpenCreateCategory}
        onCloseCreateCategory={() => setIsOpenCreateCategory(false)}
        dataDialogCreateCategory={DATA_DIALOG_CREATE_CATEGORY}
        isOpenDeleteCategory={isOpenDeleteCategory}
        onCloseDeleteCategory={() => setIsOpenDeleteCategory(false)}
        onClickSaveDeleteCategory={handleAgreeDeleteCategory}
        dataDeleteCategory={dataDeleteCategory}
        validationEditCategory={validationEditCategory}
        isOpenEditCategory={isOpenEditCategory}
        onCloseEditCategory={() => setIsOpenEditCategory(false)}
        dataDialogEditCategory={DATA_DIALOG_EDIT_CATEGORY}
        isOpenWarning={isOpenWarning}
        onCloseWarning={() => setIsOpenWarning(false)}
      />
    </Container>
  );
};

export default CategoryPage;
