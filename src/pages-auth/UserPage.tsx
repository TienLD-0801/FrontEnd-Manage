import { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import API from '@/services/axiosClient';
import { UserType } from '@/api-type/login';
import { FORMAT_INPUT } from '@/constants/date';
import { Container, IconButton } from '@mui/material';
import { LoadingContext } from '@/context/LoadingContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AlertDialogContext } from '@/context/AlertDialogContext';
import DialogForm from '@/components/admin/atoms/DialogForm/DialogForm';
import DatePicker from '@/components/admin/atoms/DatePicker/DatePicker';
import UsersWrapper from '@/components/admin/organisms/UsersWrapper/UsersWrapper';
import {
  DATA_DIALOG_CREATE_USER,
  DATA_DIALOG_EDIT_USER,
} from '@/constants/constant';
import CustomTextField from '@/components/admin/atoms/CustomTextField/CustomTextField';
import DashboardWrapper from '@/components/admin/organisms/DashboardWrapper/DashboardWrapper';
import {
  validationCreateUserSchema,
  validationEditUserSchema,
} from '@/validations/auth-validation';

const UserPage = () => {
  const preloader = useContext(LoadingContext);
  const alertDialog = useContext(AlertDialogContext);
  const { t } = useTranslation();
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [dataUsers, setDataUsers] = useState<UserType[]>([]);
  const [dataDelete, setDataDelete] = useState<{ id: string; name: string }>({
    id: '',
    name: '',
  });

  // validation create user hook
  const validationCreateUser = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      date_of_birth: '',
      card_id: '',
      phone: '',
    },
    validationSchema: validationCreateUserSchema,
    onSubmit: (value) => handleSaveCreate(value),
  });

  // validation edit user hook
  const validationEditUser = useFormik({
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
  }, []);

  // get all user
  const getUsers = async () => {
    try {
      preloader.show();
      const response = await API.apiGetUsers();
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
  const onClickEdit = (user: UserType) => {
    // reset validation edit
    validationEditUser.resetForm();
    validationEditUser.setValues({
      id: user.id,
      name: user.name,
      email: user.email,
      date_of_birth: user.date_of_birth,
      card_id: user.card_id,
      phone: user.phone,
      role: user.role,
    });
    setIsOpenEdit(true);
  };

  // Click save edit
  const handleSaveEdit = async (value: any) => {
    try {
      preloader.show();
      const updateUser = await API.apiUpdateUser(Number(value.id), value);
      const { message } = updateUser.data;
      await getUsers();
      setIsOpenEdit(false);
      alertDialog.show(message, true);
    } catch (error) {
      const message = _.get(error, 'message', JSON.stringify(error));
      alertDialog.show(message, false);
    } finally {
      preloader.hidden();
    }
  };

  // handle show dialog create
  const onClickCreate = () => {
    validationCreateUser.resetForm();
    setIsOpenCreate(true);
  };

  // handle show dialog delete
  const onClickDelete = (user: UserType) => {
    setDataDelete({ id: user.id, name: user.name });
    setIsOpenDelete(true);
  };

  // handle agree delete
  const handleAgreeDelete = async () => {
    try {
      preloader.show();
      const response = await API.apiDeleteUser(Number(dataDelete.id));
      await getUsers();
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

  // handle create new user
  const handleSaveCreate = async (value: any) => {
    try {
      preloader.show();
      const response = await API.apiCreateUser(value);
      const { message } = response.data;
      await getUsers();
      setIsOpenCreate(false);
      alertDialog.show(message, true);
    } catch (error) {
      const message = _.get(error, 'message', JSON.stringify(error));
      alertDialog.show(message, false);
    } finally {
      preloader.hidden();
    }
  };

  return (
    <Container id="users">
      <DashboardWrapper>
        <UsersWrapper
          onClickCreate={onClickCreate}
          onClickDelete={(user) => onClickDelete(user)}
          onClickEdit={(user) => onClickEdit(user)}
          dataUsers={dataUsers ?? []}
        />
      </DashboardWrapper>
      <DialogForm
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
        {/* <Box sx={{ minWidth: 400 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={validationEditUser.values[user.value]}
              onChange={(e) => handleChangeValueEdit(e, 'role')}
              label="Role"
            >
              <MenuItem value={1}>Staff</MenuItem>
              <MenuItem value={0}>Admin</MenuItem>
            </Select>
          </FormControl>
        </Box> */}
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
      </DialogForm>
    </Container>
  );
};

export default UserPage;
