import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { useFormik } from 'formik';
import API from '@/services/axiosClient';
import { Container } from '@mui/material';
import { ProductType } from '@/api-type/product';
import { CategoriesType } from '@/api-type/category';
import { LoadingContext } from '@/context/LoadingContext';
import { AlertDialogContext } from '@/context/AlertDialogContext';
import FormProduct from '@/components/admin/organisms/FormProduct/FormProduct';
import { validationCreateProductSchema } from '@/validations/product-validation';
import { validationEditProductSchema } from '@/validations/categories-validation';
import ProductWrapper from '@/components/admin/organisms/ProductWrapper/ProductWrapper';
import {
  DATA_DIALOG_CREATE_PRODUCT,
  DATA_DIALOG_EDIT_PRODUCT,
} from '@/constants/product';
import DashboardWrapper from '@/components/admin/organisms/DashboardWrapper/DashboardWrapper';
import {
  ValidationCreateProductType,
  ValidationEditProductType,
} from '@/validations/type-formik/product';

const ProductPage = () => {
  const preloader = useContext(LoadingContext);
  const alertDialog = useContext(AlertDialogContext);
  const [dataProduct, setDataProduct] = useState<ProductType[]>([]);
  const [dataOptionCategory, setDataOptionCategory] = useState<
    CategoriesType[]
  >([]);
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

  // validation create product hook
  const validationCreateProduct: ValidationCreateProductType = useFormik({
    initialValues: {
      productName: '',
      categoryName: '',
      urlImg: '',
      description: '',
      price: 0,
    },
    validationSchema: validationCreateProductSchema,
    onSubmit: (value: ProductType) => handleSaveCreateProduct(value),
  });

  // validation edit product hook
  const validationEditProduct: ValidationEditProductType = useFormik({
    initialValues: {
      id: '',
      productName: '',
      categoryName: '',
      urlImg: '',
      description: '',
      price: 0,
    },
    validationSchema: validationEditProductSchema,
    onSubmit: (product: ProductType) => handleSaveEditProduct(product),
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
  }, [isOpenCategory]);

  useEffect(() => {
    getProduct();
  }, []);

  const getCategory = async () => {
    try {
      const response = await API.apiGetCategory();
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

  // handle create new product
  const handleSaveCreateProduct = async (value: any) => {
    try {
      preloader.show();
      const response = await API.apiCreateProduct(value);
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
    validationCreateProduct.resetForm();
    setIsOpenCreateProduct(true);
  };

  // handle file change url img
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      validationCreateProduct.setValues({
        ...validationCreateProduct.values,
        urlImg: imageUrl,
      });
    }
  };

  // handle save edit call Api
  const handleSaveEditProduct = (product: ProductType) => {
    console.log(product);
  };

  // handle onClick Edit product
  const onClickEditProduct = async (product: ProductType) => {
    // reset validation edit

    validationEditProduct.resetForm();
    await getCategory();
    validationEditProduct.setValues({
      id: product.id,
      productName: product.productName,
      categoryName: product.categoryName,
      urlImg: product.urlImg,
      description: product.description,
      price: product.price,
    });

    setIsOpenEditProduct(true);
  };

  // handle open form delete product
  const onClickDeleteProduct = (product: ProductType) => {
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

  return (
    <Container id="product">
      <DashboardWrapper>
        <ProductWrapper
          onClickCreateProduct={onClickCreateProduct}
          onClickEditProduct={(product) => onClickEditProduct(product)}
          dataProduct={dataProduct}
          onClickDelete={(product) => onClickDeleteProduct(product)}
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
      />
    </Container>
  );
};

export default ProductPage;
