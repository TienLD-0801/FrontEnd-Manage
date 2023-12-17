import {
  DialogCreateProductType,
  DialogEditProductType,
} from '@/shared/constants/product';
import { VisuallyHiddenInput } from '@/assets/css/type/css-type';
import { CloudUploadOutlined } from '@mui/icons-material';
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Button,
} from '@mui/material';
import { ChangeEvent, Fragment, LegacyRef } from 'react';
import CustomTextField from '@/components/admin/atoms/CustomTextField/CustomTextField';
import DialogForm from '@/components/admin/atoms/DialogForm/DialogForm';
import { useTranslation } from 'react-i18next';
import { CategoriesType } from '@/shared/types/api-type/category';
import {
  ValidationCreateProductType,
  ValidationEditProductType,
} from '@/shared/validations/type-formik/product';
import './FormProduct.scss';

interface FormProductProps {
  dataDialogCreateProduct: DialogCreateProductType[];
  dataDialogEditProduct: DialogEditProductType[];
  isOpenCreateProduct: boolean;
  isOpenCategory: boolean;
  isOpenEditProduct: boolean;
  onCloseCreateProduct: () => void;
  onOpenCategory: () => void;
  onCloseCategory: () => void;
  dataOptionCategory: CategoriesType;
  loadingCategory: boolean;
  validationCreateProduct: ValidationCreateProductType;
  validationEditProduct: ValidationEditProductType;
  isOpenDeleteProduct: boolean;
  onCloseEditProduct: () => void;
  onCloseDeleteProduct: () => void;
  dataDeleteProduct: {
    id: string;
    name: string;
  };
  onClickSaveDeleteProduct: () => void;
  onChangeFileProduct: (event: ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: LegacyRef<HTMLInputElement>;
  isOpenWarning: boolean;
  onCloseWarning: () => void;
  handleScroll: (event: any) => void;
}

const FormProduct = ({
  dataDialogCreateProduct,
  dataDialogEditProduct,
  isOpenCreateProduct,
  isOpenCategory,
  isOpenEditProduct,
  onCloseCreateProduct,
  onOpenCategory,
  onCloseCategory,
  dataOptionCategory,
  loadingCategory,
  validationCreateProduct,
  validationEditProduct,
  isOpenDeleteProduct,
  onCloseDeleteProduct,
  onCloseEditProduct,
  dataDeleteProduct,
  onClickSaveDeleteProduct,
  onChangeFileProduct,
  fileInputRef,
  isOpenWarning,
  onCloseWarning,
  handleScroll,
}: FormProductProps) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      {/* create form */}
      <DialogForm
        onClickSave={() => validationCreateProduct.handleSubmit()}
        title={t('dialog.product.create.title')}
        open={isOpenCreateProduct}
        onClose={onCloseCreateProduct}
      >
        <form>
          {dataDialogCreateProduct.map((product) => {
            return product.isAutoComplete ? (
              <Autocomplete
                ListboxProps={{
                  onScroll: handleScroll,
                  style: { maxHeight: 150, overflow: 'auto' },
                }}
                key={product.id}
                id={product.id}
                fullWidth={true}
                open={isOpenCategory}
                onOpen={onOpenCategory}
                onClose={onCloseCategory}
                disableClearable
                isOptionEqualToValue={(option, value) =>
                  option.categoryName === value.categoryName
                }
                getOptionLabel={(option) => option.categoryName}
                options={dataOptionCategory.items}
                loading={loadingCategory}
                onSelect={(event: any) => {
                  validationCreateProduct.setValues({
                    ...validationCreateProduct.values,
                    categoryName: event.target.value,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    type={product.type}
                    sx={{ pb: 1 }}
                    label={t(product.label!)}
                    error={
                      validationCreateProduct.touched[product.value] &&
                      !!validationCreateProduct.errors[product.value]
                    }
                    helperText={
                      validationCreateProduct.touched[product.value] &&
                      validationCreateProduct.errors[product.value]
                    }
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <Fragment>
                          {loadingCategory ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </Fragment>
                      ),
                    }}
                    {...validationCreateProduct.getFieldProps(product.value)}
                  />
                )}
              />
            ) : product.isImage ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '20px',
                }}
                key={product.id}
                id={product.id}
              >
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <CustomTextField
                    margin={undefined}
                    label={t(product.label!)}
                    fullWidth={true}
                    type={product.type}
                    key={product.id}
                    id={product.id}
                    inputProps={{
                      readOnly: true,
                    }}
                    error={
                      validationCreateProduct.touched[product.value] &&
                      !!validationCreateProduct.errors[product.value]
                    }
                    helperText={
                      validationCreateProduct.touched[product.value] &&
                      validationCreateProduct.errors[product.value]
                    }
                    {...validationCreateProduct.getFieldProps(product.value)}
                    value={validationCreateProduct.values[product.value]}
                  />
                  <Button
                    sx={{ mb: 1, mt: 1, p: 1.5, width: '100%' }}
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadOutlined />}
                  >
                    {t('dialog.product.create.titleUpdateFile')}
                    <VisuallyHiddenInput
                      type="file"
                      ref={fileInputRef}
                      onChange={(event) => onChangeFileProduct(event)}
                    />
                  </Button>
                </div>
                {validationCreateProduct.values.url ? (
                  <div
                    style={{
                      width: 200,
                      height: 150,
                      border: '3px solid blue',
                    }}
                  >
                    <img
                      width={'100%'}
                      height={'100%'}
                      alt="No Image"
                      src={validationCreateProduct.values.url}
                    ></img>
                  </div>
                ) : (
                  <div
                    style={{
                      width: 200,
                      height: 150,
                      border: '3px solid blue',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: 18,
                      fontWeight: 400,
                    }}
                  >
                    {t('dialog.product.create.noImage')}
                  </div>
                )}
              </div>
            ) : (
              <CustomTextField
                type={product.type}
                key={product.id}
                id={product.id}
                label={t(product.label!)}
                margin={product.margin}
                sx={{ pb: 1 }}
                fullWidth={true}
                error={
                  validationCreateProduct.touched[product.value] &&
                  !!validationCreateProduct.errors[product.value]
                }
                helperText={
                  validationCreateProduct.touched[product.value] &&
                  validationCreateProduct.errors[product.value]
                }
                {...validationCreateProduct.getFieldProps(product.value)}
              />
            );
          })}
        </form>
      </DialogForm>
      {/* edit form */}
      <DialogForm
        onClickSave={() => validationEditProduct.handleSubmit()}
        title={t('dialog.product.edit.title')}
        open={isOpenEditProduct}
        onClose={onCloseEditProduct}
      >
        <form>
          {dataDialogEditProduct.map((product) => {
            return product.isAutoComplete ? (
              <Autocomplete
                value={dataOptionCategory.items.find(
                  (category) =>
                    category.categoryName ===
                    validationEditProduct.values.categoryName,
                )}
                isOptionEqualToValue={(option, value) =>
                  option.categoryName === value?.categoryName
                }
                onKeyDown={(event) => {
                  event.preventDefault();
                }}
                disableClearable={true}
                key={product.id}
                id={product.id}
                fullWidth={true}
                open={isOpenCategory}
                onOpen={onOpenCategory}
                onClose={onCloseCategory}
                getOptionLabel={(option) => option.categoryName}
                options={dataOptionCategory.items}
                loading={loadingCategory}
                onSelect={(event: any) => {
                  validationEditProduct.setValues({
                    ...validationEditProduct.values,
                    categoryName: event.target.value,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    type={product.type}
                    sx={{ pb: 1 }}
                    label={t(product.label!)}
                    error={
                      validationEditProduct.touched[product.value] &&
                      !!validationEditProduct.errors[product.value]
                    }
                    helperText={
                      validationEditProduct.touched[product.value] &&
                      validationEditProduct.errors[product.value]
                    }
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <Fragment>
                          {loadingCategory ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </Fragment>
                      ),
                    }}
                  />
                )}
              />
            ) : product.isImage ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '20px',
                }}
                key={product.id}
                id={product.id}
              >
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <CustomTextField
                    margin={undefined}
                    label={t(product.label!)}
                    fullWidth={true}
                    type={product.type}
                    key={product.id}
                    id={product.id}
                    inputProps={{
                      readOnly: true,
                    }}
                    error={
                      validationEditProduct.touched[product.value] &&
                      !!validationEditProduct.errors[product.value]
                    }
                    helperText={
                      validationEditProduct.touched[product.value] &&
                      validationEditProduct.errors[product.value]
                    }
                    value={validationEditProduct.values[product.value]}
                  />
                  <Button
                    sx={{ mb: 1, mt: 1, p: 1.5, width: '100%' }}
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadOutlined />}
                  >
                    {t('dialog.product.create.titleUpdateFile')}
                    <VisuallyHiddenInput
                      type="file"
                      ref={fileInputRef}
                      onChange={(event) => onChangeFileProduct(event)}
                    />
                  </Button>
                </div>
                {validationEditProduct.values.url ? (
                  <div
                    style={{
                      width: 200,
                      height: 150,
                      border: '3px solid blue',
                    }}
                  >
                    <img
                      width={'100%'}
                      height={'100%'}
                      alt="No Image"
                      src={validationEditProduct.values.url}
                    ></img>
                  </div>
                ) : (
                  <div
                    style={{
                      width: 200,
                      height: 150,
                      border: '3px solid blue',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: 18,
                      fontWeight: 400,
                    }}
                  >
                    {t('dialog.product.create.noImage')}
                  </div>
                )}
              </div>
            ) : (
              <CustomTextField
                type={product.type}
                key={product.id}
                id={product.id}
                label={t(product.label!)}
                margin={product.margin}
                sx={{ pb: 1 }}
                fullWidth={true}
                error={
                  validationEditProduct.touched[product.value] &&
                  !!validationEditProduct.errors[product.value]
                }
                helperText={
                  validationEditProduct.touched[product.value] &&
                  validationEditProduct.errors[product.value]
                }
                {...validationEditProduct.getFieldProps(product.value)}
                value={validationEditProduct.values[product.value]}
              />
            );
          })}
        </form>
      </DialogForm>
      <DialogForm
        fullWidth={false}
        open={isOpenDeleteProduct}
        title={t('dialog.product.delete.title')}
        onClose={onCloseDeleteProduct}
        onClickSave={onClickSaveDeleteProduct}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div>{t('dialog.product.delete.content')}</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>
            &nbsp;"{dataDeleteProduct.name}"&nbsp;
          </div>
          <div>?</div>
        </div>
      </DialogForm>
      <DialogForm
        title={t('dialog.product.warning.title')}
        open={isOpenWarning}
        colorTitle="red"
        type="warning"
        onClose={onCloseWarning}
        classNameDialog="dialog"
      >
        {t('dialog.product.warning.content')}
      </DialogForm>
    </Fragment>
  );
};

export default FormProduct;
