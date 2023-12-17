import { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import API from '@/services/axiosClient';
import { Container } from '@mui/material';
import { CategoriesType, CategoriesItem } from '@/shared/types/api-type/category';
import { LoadingContext } from '@/context/LoadingContext';
import { AlertDialogContext } from '@/context/AlertDialogContext';
import DashboardWrapper from '@/components/admin/organisms/DashboardWrapper/DashboardWrapper';
import CategoriesWrapper from '@/components/admin/organisms/CategoriesWrapper/CategoriesWrapper';
import FormCategory from '@/components/admin/organisms/FormCategory/FormCategory';
import {
  CATEGORY_LIMIT_PAGE,
  CATEGORY_PAGE,
  DATA_DIALOG_CREATE_CATEGORY,
  DATA_DIALOG_EDIT_CATEGORY,
} from '@/shared/constants/category';
import {
  ValidationCreateCategoryType,
  ValidationEditCategoryType,
} from '@/shared/validations/type-formik/category';
import { useFormik } from 'formik';
import {
  validationCreateCategorySchema,
  validationEditCategorySchema,
} from '@/shared/validations/categories-validation';
import { DATA_INITIAL } from '@/shared/constants/constant';

const CategoryPage = () => {
  const preloader = useContext(LoadingContext);
  const alertDialog = useContext(AlertDialogContext);
  const [dataCategory, setDataCategory] =
    useState<CategoriesType>(DATA_INITIAL);

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

  const [paramPagination, setParamPagination] = useState<{
    page: number;
    limit: number;
  }>({
    page: CATEGORY_PAGE,
    limit: CATEGORY_LIMIT_PAGE,
  });

  // validation edit category hook
  const validationEditCategory: ValidationEditCategoryType = useFormik({
    initialValues: {
      id: '',
      categoryName: '',
    },
    validationSchema: validationEditCategorySchema,
    onSubmit: (category) => handleSaveEditCategory(category),
  });

  // validation create category hook
  const validationCreateCategory: ValidationCreateCategoryType = useFormik({
    initialValues: {
      categoryName: '',
    },
    validationSchema: validationCreateCategorySchema,
    onSubmit: (category) => handleSaveCreateCategory(category),
  });

  // handle call api product and category
  useEffect(() => {
    getCategories();
  }, [paramPagination]);

  // handle page previous
  useEffect(() => {
    if (dataCategory.items.length) return;
    handleChangePageCategory(null, dataCategory.meta.previousPage);
  }, [dataCategory]);

  // get all category
  const getCategories = async () => {
    try {
      preloader.show();
      const response = await API.apiGetCategory(paramPagination);
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
  const handleSaveCreateCategory = async (category: CategoriesItem) => {
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
  const handleSaveEditCategory = async (category: CategoriesItem) => {
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

  const onClickEditCategory = (category: CategoriesItem) => {
    validationEditCategory.resetForm();
    validationEditCategory.setValues({
      id: category.id!,
      categoryName: category.categoryName,
    });
    setIsOpenEditCategory(true);
  };

  // handle show dialog delete category
  const onClickDeleteCategory = (category: CategoriesItem) => {
    if (category.isProductUse) {
      setIsOpenWarning(true);
    } else {
      setDataDeleteCategory({
        id: category.id!,
        categoryName: category.categoryName,
      });
      setIsOpenDeleteCategory(true);
    }
  };

  const handleChangePageCategory = (_event: any, page: number) => {
    if (dataCategory.meta.currentPage === page) return;
    setParamPagination({
      page: page,
      limit: CATEGORY_LIMIT_PAGE,
    });
  };

  return (
    <Container id="category">
      <DashboardWrapper>
        <CategoriesWrapper
          onClickDelete={(category) => onClickDeleteCategory(category)}
          onClickEdit={(category) => onClickEditCategory(category)}
          dataCategory={dataCategory}
          onClickCreate={onClickCreateProduct}
          handlePageChange={(event, page) =>
            handleChangePageCategory(event, page)
          }
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
