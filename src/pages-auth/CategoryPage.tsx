import { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import API from '@/services/axiosClient';
import { Container } from '@mui/material';
import { CategoriesType } from '@/api-type/category';
import { LoadingContext } from '@/context/LoadingContext';
import { AlertDialogContext } from '@/context/AlertDialogContext';
import DashboardWrapper from '@/components/admin/organisms/DashboardWrapper/DashboardWrapper';
import CategoriesWrapper from '@/components/admin/organisms/CategoriesWrapper/CategoriesWrapper';
import DialogForm from '@/components/admin/atoms/DialogForm/DialogForm';
import { useTranslation } from 'react-i18next';

const CategoryPage = () => {
  const preloader = useContext(LoadingContext);
  const alertDialog = useContext(AlertDialogContext);
  const { t } = useTranslation();
  const [dataCategory, setDataCategory] = useState<CategoriesType[]>([]);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [dataDelete, setDataDelete] = useState<{ id: string; name: string }>({
    id: '',
    name: '',
  });

  useEffect(() => {
    getCategories();
  }, []);

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

  // handle agree delete category
  const handleAgreeDeleteCategory = async () => {
    try {
      preloader.show();
      const response = await API.apiDeleteCategory(Number(dataDelete.id));
      await getCategories();
      const { message } = response.data;
      setIsOpenDelete(false);
      alertDialog.show(message, true);
    } catch (error) {
      const message = _.get(error, 'message', JSON.stringify(error));
      alertDialog.show(message, false);
    } finally {
      preloader.hidden();
    }
  };

  // handle show dialog delete
  const onClickDelete = (category: CategoriesType) => {
    setDataDelete({ id: category.id, name: category.productCategory });
    setIsOpenDelete(true);
  };

  return (
    <Container id="category">
      <DashboardWrapper>
        <CategoriesWrapper
          onClickDelete={(category) => onClickDelete(category)}
          dataCategory={dataCategory ?? []} onClickCreate={function (): void {
            throw new Error('Function not implemented.');
          } }        />
      </DashboardWrapper>
      <DialogForm
        open={isOpenDelete}
        title={t('dialog.category.delete.title')}
        onClose={() => setIsOpenDelete(false)}
        onClickSave={handleAgreeDeleteCategory}
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
            &nbsp;"{dataDelete.name}"&nbsp;
          </div>
          <div>?</div>
        </div>
      </DialogForm>
    </Container>
  );
};

export default CategoryPage;
