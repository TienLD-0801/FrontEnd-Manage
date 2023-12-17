import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { useFormik } from 'formik';
import API from '@/services/axiosClient';
import { Container } from '@mui/material';
import { ProductItem, ProductType } from '@/shared/types/api-type/product';
import { CategoriesType } from '@/shared/types/api-type/category';
import { LoadingContext } from '@/context/LoadingContext';
import {
  DATA_DIALOG_EDIT_PRODUCT,
  DATA_DIALOG_CREATE_PRODUCT,
  PRODUCT_PAGE,
  PRODUCT_LIMIT_PAGE,
} from '@/shared/constants/product';
import { AlertDialogContext } from '@/context/AlertDialogContext';
import FormProduct from '@/components/admin/organisms/FormProduct/FormProduct';
import {
  validationCreateProductSchema,
  validationEditProductSchema,
} from '@/shared/validations/product-validation';
import ProductWrapper from '@/components/admin/organisms/ProductWrapper/ProductWrapper';
import DashboardWrapper from '@/components/admin/organisms/DashboardWrapper/DashboardWrapper';
import {
  ValidationCreateProductType,
  ValidationEditProductType,
} from '@/shared/validations/type-formik/product';
import { CATEGORY_LIMIT_PAGE, CATEGORY_PAGE } from '@/shared/constants/category';
import { DATA_INITIAL } from '@/shared/constants/constant';

const ProductPage = () => {
  const preloader = useContext(LoadingContext);
  const alertDialog = useContext(AlertDialogContext);
  const [dataProduct, setDataProduct] = useState<ProductType>(DATA_INITIAL);
  const [dataOptionCategory, setDataOptionCategory] =
    useState<CategoriesType>(DATA_INITIAL);
  const [isOpenCreateProduct, setIsOpenCreateProduct] =
    useState<boolean>(false);
  const [isOpenEditProduct, setIsOpenEditProduct] = useState<boolean>(false);
  const [isOpenCategory, setIsOpenCategory] = useState<boolean>(false);
  const [loadingCategory, setIsLoadingCategory] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpenDeleteProduct, setIsOpenDeleteProduct] =
    useState<boolean>(false);
  const [dataDeleteProduct, setDataDeleteProduct] = useState<{
    id: string;
    name: string;
  }>({ id: '', name: '' });
  const [file, setFile] = useState<File>();
  const [isOpenWarning, setIsOpenWarning] = useState<boolean>(false);
  const [paramPaginationCategory, setParamPaginationCategory] = useState<{
    page: number;
    limit: number;
  }>({
    page: CATEGORY_PAGE,
    limit: CATEGORY_LIMIT_PAGE,
  });
  const [paramPaginationProduct, setParamPaginationProduct] = useState<{
    page: number;
    limit: number;
  }>({
    page: PRODUCT_PAGE,
    limit: PRODUCT_LIMIT_PAGE,
  });

  // validation create product hook
  const validationCreateProduct: ValidationCreateProductType = useFormik({
    initialValues: {
      productName: '',
      categoryName: '',
      description: '',
      url: '',
      price: 0,
    },
    validationSchema: validationCreateProductSchema,
    onSubmit: (value) => handleSaveCreateProduct(value),
  });

  // validation edit product hook
  const validationEditProduct: ValidationEditProductType = useFormik({
    initialValues: {
      id: '',
      productName: '',
      categoryName: '',
      url: '',
      description: '',
      price: 0,
    },
    validationSchema: validationEditProductSchema,
    onSubmit: (product) => handleSaveEditProduct(product),
  });

  useEffect(() => {
    if (isOpenCategory && isOpenCreateProduct) {
      setIsLoadingCategory(true);
      setTimeout(() => {
        getCategory();
      }, 1200);
    } else {
      setIsLoadingCategory(false);
    }
  }, [isOpenCategory, paramPaginationCategory]);

  useEffect(() => {
    getProduct();
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const response = await API.apiGetCategory(paramPaginationCategory);
      const { result } = response.data;
      setDataOptionCategory(result);
    } catch (error) {
      const message = _.get(error, 'message', JSON.stringify(error));
      alertDialog.show(message, false);
    } finally {
      setIsLoadingCategory(false);
    }
  };

  const getProduct = async () => {
    try {
      preloader.show();
      const response = await API.apiGetProduct(paramPaginationProduct);
      const { result } = response.data;
      setDataProduct(result);
    } catch (error) {
      const message = _.get(error, 'message', JSON.stringify(error));
      alertDialog.show(message, false);
    } finally {
      preloader.hidden();
    }
  };

  // handle create new product
  const handleSaveCreateProduct = async (product: ProductItem) => {
    const dataProduct = new FormData();
    dataProduct.append('productName', product.productName);
    dataProduct.append('categoryName', product.categoryName);
    dataProduct.append('fileImage', file!);
    dataProduct.append('description', product.description);
    dataProduct.append('price', product.price.toString());

    try {
      preloader.show();
      const response = await API.apiCreateProduct(dataProduct);
      const { message } = response.data;
      await getProduct();
      setIsOpenCreateProduct(false);
      alertDialog.show(message, true);
    } catch (error) {
      const message = _.get(error, 'message', JSON.stringify(error));
      alertDialog.show(message, false);
    } finally {
      preloader.hidden();
    }
  };

  // handle show dialog create product
  const onClickCreateProduct = () => {
    if (dataOptionCategory.items.length <= 0) {
      setIsOpenWarning(true);
    } else {
      validationCreateProduct.resetForm();
      setIsOpenCreateProduct(true);
    }
  };

  // handle file change url img
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      validationCreateProduct.setValues({
        ...validationCreateProduct.values,
        url: imageUrl,
      });
    }
  };

  // handle save edit call Api
  const handleSaveEditProduct = (product: ProductItem) => {
    console.log(product);
  };

  // handle onClick Edit product
  const onClickEditProduct = async (product: ProductItem) => {
    // reset validation edit
    validationEditProduct.resetForm();
    await getCategory();
    validationEditProduct.setValues({
      id: product.id!,
      productName: product.productName,
      categoryName: product.categoryName,
      url: product.url,
      description: product.description,
      price: product.price,
    });

    setIsOpenEditProduct(true);
  };

  // handle open form delete product
  const onClickDeleteProduct = (product: ProductItem) => {
    setDataDeleteProduct({ id: product.id!, name: product.productName });
    setIsOpenDeleteProduct(true);
  };

  // handle call api delete product
  const onClickSaveDeleteProduct = async () => {
    try {
      preloader.show();
      const response = await API.apiDeleteProduct(Number(dataDeleteProduct.id));
      await getProduct();
      const { message } = response.data;
      setIsOpenDeleteProduct(false);
      alertDialog.show(message, true);
    } catch (error) {
      const message = _.get(error, 'message', JSON.stringify(error));
      alertDialog.show(message, false);
    } finally {
      preloader.hidden();
    }
  };

  const handleChangePageProduct = (_event: any, page: number) => {
    if (dataProduct.meta.currentPage === page) return;
    setParamPaginationProduct({
      page: page,
      limit: PRODUCT_LIMIT_PAGE,
    });
  };

  const handleScroll = (event: any) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (
      scrollHeight - scrollTop === clientHeight &&
      !loadingCategory &&
      dataOptionCategory.meta.nextPage
    ) {
      setParamPaginationCategory({
        page: CATEGORY_PAGE,
        limit: paramPaginationCategory.limit + CATEGORY_LIMIT_PAGE,
      });
    }
  };

  return (
    <Container id="product">
      <DashboardWrapper>
        <ProductWrapper
          onClickCreateProduct={onClickCreateProduct}
          onClickEditProduct={(product) => onClickEditProduct(product)}
          dataProduct={dataProduct}
          onClickDelete={(product) => onClickDeleteProduct(product)}
          handlePageChange={(event, page) =>
            handleChangePageProduct(event, page)
          }
        />
      </DashboardWrapper>
      <FormProduct
        dataDialogCreateProduct={DATA_DIALOG_CREATE_PRODUCT}
        dataDialogEditProduct={DATA_DIALOG_EDIT_PRODUCT}
        isOpenCreateProduct={isOpenCreateProduct}
        isOpenCategory={isOpenCategory}
        onCloseCreateProduct={() => setIsOpenCreateProduct(false)}
        onOpenCategory={() => setIsOpenCategory(true)}
        onCloseCategory={() => setIsOpenCategory(false)}
        dataOptionCategory={dataOptionCategory}
        loadingCategory={loadingCategory}
        validationCreateProduct={validationCreateProduct}
        isOpenDeleteProduct={isOpenDeleteProduct}
        onCloseDeleteProduct={() => setIsOpenDeleteProduct(false)}
        dataDeleteProduct={dataDeleteProduct}
        onClickSaveDeleteProduct={onClickSaveDeleteProduct}
        onChangeFileProduct={(event) => handleFileChange(event)}
        fileInputRef={fileInputRef}
        isOpenEditProduct={isOpenEditProduct}
        validationEditProduct={validationEditProduct}
        onCloseEditProduct={() => setIsOpenEditProduct(false)}
        isOpenWarning={isOpenWarning}
        onCloseWarning={() => setIsOpenWarning(false)}
        handleScroll={(event) => handleScroll(event)}
      />
    </Container>
  );
};

export default ProductPage;
