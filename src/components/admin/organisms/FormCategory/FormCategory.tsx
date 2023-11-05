import { Fragment } from 'react';
import DialogForm from '@/components/admin/atoms/DialogForm/DialogForm';
import { useTranslation } from 'react-i18next';
import {
  ValidationCreateCategoryType,
  ValidationEditCategoryType,
} from '@/validations/type-formik/category';
import {
  DialogCreateCategoryType,
  DialogEditCategoryType,
} from '@/constants/category';
import CustomTextField from '@/components/admin/atoms/CustomTextField/CustomTextField';

interface FormCategoryProps {
  validationCreateCategory: ValidationCreateCategoryType;
  validationEditCategory: ValidationEditCategoryType;
  isOpenCreateCategory: boolean;
  onCloseCreateCategory: () => void;
  dataDialogCreateCategory: DialogCreateCategoryType[];
  isOpenDeleteCategory: boolean;
  onCloseDeleteCategory: () => void;
  onClickSaveDeleteCategory: () => void;
  dataDeleteCategory: { id: string; categoryName: string };
  isOpenEditCategory: boolean;
  onCloseEditCategory: () => void;
  dataDialogEditCategory: DialogEditCategoryType[];
  isOpenWarning: boolean;
  onCloseWarning: () => void;
}

const FormCategory = ({
  validationCreateCategory,
  isOpenCreateCategory,
  onCloseCreateCategory,
  dataDialogCreateCategory,
  isOpenDeleteCategory,
  onCloseDeleteCategory,
  isOpenEditCategory,
  onCloseEditCategory,
  onClickSaveDeleteCategory,
  dataDeleteCategory,
  dataDialogEditCategory,
  validationEditCategory,
  isOpenWarning,
  onCloseWarning,
}: FormCategoryProps) => {
  const { t } = useTranslation();
  return (
    <Fragment>
      {/* create form */}
      <DialogForm
        onClickSave={() => validationCreateCategory.handleSubmit()}
        title={t('dialog.category.create.title')}
        open={isOpenCreateCategory}
        onClose={onCloseCreateCategory}
      >
        <form>
          {dataDialogCreateCategory.map((category) => {
            return (
              <CustomTextField
                type={category.type}
                key={category.id}
                id={category.id}
                label={t(category.label!)}
                margin={category.margin}
                sx={{ pb: 1 }}
                fullWidth={true}
                error={
                  validationCreateCategory.touched[category.value] &&
                  !!validationCreateCategory.errors[category.value]
                }
                helperText={
                  validationCreateCategory.touched[category.value] &&
                  validationCreateCategory.errors[category.value]
                }
                {...validationCreateCategory.getFieldProps(category.value)}
              />
            );
          })}
        </form>
      </DialogForm>
      {/* edit form */}
      <DialogForm
        onClickSave={() => validationEditCategory.handleSubmit()}
        title={t('dialog.category.create.title')}
        open={isOpenEditCategory}
        onClose={onCloseEditCategory}
      >
        <form>
          {dataDialogEditCategory.map((category) => {
            return (
              <CustomTextField
                type={category.type}
                key={category.id}
                id={category.id}
                label={t(category.label!)}
                margin={category.margin}
                sx={{ pb: 1 }}
                fullWidth={true}
                error={
                  validationEditCategory.touched[category.value] &&
                  !!validationEditCategory.errors[category.value]
                }
                helperText={
                  validationEditCategory.touched[category.value] &&
                  validationEditCategory.errors[category.value]
                }
                {...validationEditCategory.getFieldProps(category.value)}
              />
            );
          })}
        </form>
      </DialogForm>
      <DialogForm
        open={isOpenDeleteCategory}
        title={t('dialog.category.delete.title')}
        onClose={onCloseDeleteCategory}
        onClickSave={onClickSaveDeleteCategory}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div>{t('dialog.category.delete.content')}</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>
            &nbsp;"{dataDeleteCategory.categoryName}"&nbsp;
          </div>
          <div>?</div>
        </div>
      </DialogForm>
      <DialogForm
        title={t('dialog.category.warning.title')}
        open={isOpenWarning}
        colorTitle="red"
        type="warning"
        onClose={onCloseWarning}
        classNameDialog="dialog"
      >
        {t('dialog.category.warning.content')}
      </DialogForm>
    </Fragment>
  );
};

export default FormCategory;
