import { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { useFormik } from 'formik';
import API from '@/services/axiosClient';
import { Container } from '@mui/material';
import { UserItem, UserType } from '@/shared/types/api-type/login';
import { LoadingContext } from '@/context/LoadingContext';
import { AlertDialogContext } from '@/context/AlertDialogContext';
import FormUser from '@/components/admin/organisms/FormUser/FormUser';
import UsersWrapper from '@/components/admin/organisms/UsersWrapper/UsersWrapper';
import {
  DATA_DIALOG_CREATE_USER,
  DATA_DIALOG_EDIT_USER,
  DATA_INITIAL,
} from '@/shared/constants/constant';
import DashboardWrapper from '@/components/admin/organisms/DashboardWrapper/DashboardWrapper';
import {
  ValidationCreateUserType,
  ValidationEditUserType,
} from '@/shared/validations/type-formik/user';
import {
  validationCreateUserSchema,
  validationEditUserSchema,
} from '@/shared/validations/auth-validation';

const UserPage = () => {
  const preloader = useContext(LoadingContext);
  const alertDialog = useContext(AlertDialogContext);
  const [isOpenEditUser, setIsOpenEditUser] = useState<boolean>(false);
  const [isOpenCreateUser, setIsOpenCreateUser] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isOpenDeleteUser, setIsOpenDeleteUser] = useState<boolean>(false);
  const [dataUsers, setDataUsers] = useState<UserType>(DATA_INITIAL);
  const [dataDeleteUser, setDataDeleteUser] = useState<{
    id: string;
    name: string;
  }>({
    id: '',
    name: '',
  });
  const [paramPagination, setParamPagination] = useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 20,
  });

  // validation create user hook
  const validationCreateUser: ValidationCreateUserType = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      date_of_birth: '',
      card_id: '',
      phone: '',
      role: 0,
    },
    validationSchema: validationCreateUserSchema,
    onSubmit: (value) => handleSaveCreate(value),
  });

  // validation edit user hook
  const validationEditUser: ValidationEditUserType = useFormik({
    initialValues: {
      id: '',
      name: '',
      email: '',
      date_of_birth: '',
      card_id: '',
      phone: '',
      role: 0,
    },
    validationSchema: validationEditUserSchema,
    onSubmit: (value) => handleSaveEdit(value),
  });

  // get all user
  useEffect(() => {
    getUsers();
  }, [paramPagination]);

  // handle page previous
  useEffect(() => {
    if (dataUsers.items.length) return;
    handleChangePageUser(null, dataUsers.meta.previousPage);
  }, [dataUsers]);

  // get all user
  const getUsers = async () => {
    try {
      preloader.show();
      const response = await API.apiGetUsers(paramPagination);
      const { result } = response.data;
      setDataUsers(result);
    } catch (error) {
      const message = _.get(error, 'message', JSON.stringify(error));
      alertDialog.show(message, false);
    } finally {
      preloader.hidden();
    }
  };

  // click edit show dialog get get value
  const onClickEdit = (user: UserItem) => {
    // reset validation edit
    validationEditUser.resetForm();
    validationEditUser.setValues({
      id: user.id!,
      name: user.name,
      email: user.email,
      date_of_birth: user.date_of_birth,
      card_id: user.card_id,
      phone: user.phone,
      role: user.role,
    });
    setIsOpenEditUser(true);
  };

  // Click save edit
  const handleSaveEdit = async (value: any) => {
    try {
      preloader.show();
      const updateUser = await API.apiUpdateUser(Number(value.id), value);
      const { message } = updateUser.data;
      await getUsers();
      setIsOpenEditUser(false);
      alertDialog.show(message, true);
    } catch (error) {
      const message = _.get(error, 'message', JSON.stringify(error));
      alertDialog.show(message, false);
    } finally {
      preloader.hidden();
    }
  };

  // handle show dialog create
  const onClickCreateUser = () => {
    validationCreateUser.resetForm();
    setIsOpenCreateUser(true);
  };

  // handle show dialog delete
  const onClickDelete = (user: UserItem) => {
    setDataDeleteUser({ id: user.id!, name: user.name });
    setIsOpenDeleteUser(true);
  };

  // handle agree delete
  const onClickSaveDeleteUser = async () => {
    try {
      preloader.show();
      const response = await API.apiDeleteUser(Number(dataDeleteUser.id));
      await getUsers();
      const { message } = response.data;
      setIsOpenDeleteUser(false);
      alertDialog.show(message, true);
    } catch (error) {
      const message = _.get(error, 'message', JSON.stringify(error));
      alertDialog.show(message, false);
    } finally {
      preloader.hidden();
    }
  };

  // handle create new user
  const handleSaveCreate = async (value: UserItem) => {
    try {
      preloader.show();
      const response = await API.apiCreateUser(value);
      const { message } = response.data;
      await getUsers();
      setIsOpenCreateUser(false);
      alertDialog.show(message, true);
    } catch (error) {
      const message = _.get(error, 'message', JSON.stringify(error));
      alertDialog.show(message, false);
    } finally {
      preloader.hidden();
    }
  };

  const handleChangePageUser = (_event: any, page: number) => {
    if (dataUsers.meta.currentPage === page) return;
    setParamPagination({
      page: page,
      limit: 20,
    });
  };

  return (
    <Container id="users">
      <DashboardWrapper>
        <UsersWrapper
          onClickCreate={onClickCreateUser}
          onClickDelete={(user) => onClickDelete(user)}
          onClickEdit={(user) => onClickEdit(user)}
          dataUsers={dataUsers}
          handlePageChange={(event, page) => handleChangePageUser(event, page)}
        />
      </DashboardWrapper>
      <FormUser
        validationCreateUser={validationCreateUser}
        validationEditUser={validationEditUser}
        isOpenCreateUser={isOpenCreateUser}
        onCloseCreateUser={() => setIsOpenCreateUser(false)}
        dataDialogCreateUser={DATA_DIALOG_CREATE_USER}
        dataDialogEditUser={DATA_DIALOG_EDIT_USER}
        isShowPassword={isShowPassword}
        onShowPassword={() => setIsShowPassword(!isShowPassword)}
        isOpenEditUser={isOpenEditUser}
        onCloseEditUser={() => setIsOpenEditUser(false)}
        isOpenDeleteUser={isOpenDeleteUser}
        onCloseDeleteUser={() => setIsOpenDeleteUser(false)}
        dataDeleteUser={dataDeleteUser}
        onClickSaveDeleteUser={onClickSaveDeleteUser}
      />
      {/* <DialogForm
        onClickSave={() => validationCreateUser.handleSubmit()}
        title={t('dialog.user.create.title')}
        open={isOpenCreate}
        onClose={() => setIsOpenCreate(false)}
      >
        <form>
          {DATA_DIALOG_CREATE_USER.map((user) => {
            return !user.isPicker ? (
              <CustomTextField
                key={user.id}
                id={user.id}
                label={t(user.label!)}
                margin={user.margin}
                sx={{ pb: 1 }}
                fullWidth={true}
                autoComplete={user.autoComplete}
                type={
                  user.type === 'password'
                    ? isShowPassword
                      ? 'text'
                      : 'password'
                    : user.type
                }
                inputProps={{
                  endAdornment: user.type === 'password' && (
                    <IconButton
                      onClick={() => setIsShowPassword(!isShowPassword)}
                      edge="end"
                    >
                      {isShowPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                error={
                  validationCreateUser.touched[user.value] &&
                  !!validationCreateUser.errors[user.value]
                }
                helperText={
                  validationCreateUser.touched[user.value] &&
                  validationCreateUser.errors[user.value]
                }
                {...validationCreateUser.getFieldProps(user.value)}
              />
            ) : (
              <DatePicker
                key={user.id}
                format={FORMAT_INPUT}
                sx={{ pb: 1 }}
                variant="outlined"
                error={
                  validationCreateUser.touched[user.value] &&
                  !!validationCreateUser.errors[user.value]
                }
                fullWidth={true}
                helperText={
                  validationCreateUser.touched[user.value] &&
                  validationCreateUser.errors[user.value]
                }
                onChange={(date) => {
                  validationCreateUser.setFieldValue(user.value, date);
                }}
              />
            );
          })}
        </form>
      </DialogForm>
      <DialogForm
        onClickSave={() => validationEditUser.handleSubmit()}
        title={t('dialog.user.edit.title')}
        open={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
      >
        {DATA_DIALOG_EDIT_USER.map((user) => {
          return !user.isPicker ? (
            <CustomTextField
              key={user.id}
              sx={{ pb: 2 }}
              margin="dense"
              id={user.value}
              label={user.label}
              type={user.type}
              fullWidth={true}
              {...validationEditUser.getFieldProps(user.value)}
              value={validationEditUser.values[user.value]}
              error={
                validationEditUser.touched[user.value] &&
                !!validationEditUser.errors[user.value]
              }
              helperText={
                validationEditUser.touched[user.value] &&
                validationEditUser.errors[user.value]
              }
            />
          ) : (
            <DatePicker
              key={user.id}
              format={FORMAT_INPUT}
              sx={{ pb: 2 }}
              variant="outlined"
              value={dayjs(validationEditUser.values[user.value])}
              error={
                validationEditUser.touched[user.value] &&
                !!validationEditUser.errors[user.value]
              }
              fullWidth={true}
              helperText={
                validationEditUser.touched[user.value] &&
                validationEditUser.errors[user.value]
              }
              onChange={(date) => {
                validationEditUser.setFieldValue(user.value, date);
              }}
            />
          );
        })}
      </DialogForm>
      <DialogForm
        open={isOpenDelete}
        title={t('dialog.user.delete.title')}
        onClose={() => setIsOpenDelete(false)}
        onClickSave={handleAgreeDelete}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div>{t('dialog.user.delete.content')}</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>
            &nbsp;"{dataDelete.name}"&nbsp;
          </div>
          <div>?</div>
        </div>
      </DialogForm> */}
    </Container>
  );
};

export default UserPage;
