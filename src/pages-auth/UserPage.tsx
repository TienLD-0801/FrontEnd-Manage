import {
  Box,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import DashboardWrapper from '@/components/admin/organisms/DashboardWrapper/DashboardWrapper';
import UsersWrapper from '@/components/admin/organisms/UsersWrapper/UsersWrapper';
import { useContext, useEffect, useState } from 'react';
import API from '@/services/axiosClient';
import { LoadingContext } from '@/context/LoadingContext';
import { AlertDialogContext } from '@/context/AlertDialogContext';
import _ from 'lodash';
import { UserType } from '@/api_type/Login/login';
import DialogUser from '@/components/admin/atoms/DialogUser/DialogUser';
import DialogQuestions from '@/components/admin/atoms/DialogQuestions/DialogQuestions';
import {
  DATA_DIALOG_CREATE_USER,
  DATA_DIALOG_USER,
} from '@/constants/constant';
import { useFormik } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { validationCreateUserSchema } from '@/validations/auth_validation';

const UserPage = () => {
  const preloader = useContext(LoadingContext);
  const alertDialog = useContext(AlertDialogContext);

  // validation hook
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
  const [dataUsers, setDataUsers] = useState<UserType[]>([]);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [dataDelete, setDataDelete] = useState<{ id: string; name: string }>({
    id: '',
    name: '',
  });
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [valueFormEdit, setValueFormEdit] = useState<{
    id: string;
    name: string;
    email: string;
    phone: number;
    role: number;
  }>({
    id: '',
    name: '',
    email: '',
    phone: 0,
    role: 0,
  });

  // handle change value and select value edit
  const handleChangeValueEdit = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<number>,
    fieldName: string,
  ) => {
    setValueFormEdit((prevFormEdit) => ({
      ...prevFormEdit,
      [fieldName]: e.target.value,
    }));
  };

  // get all user
  useEffect(() => {
    getUSers();
  }, []);

  // get all user
  const getUSers = async () => {
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
    setValueFormEdit({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: 0,
    });
    setIsOpenEdit(true);
  };

  // Click save edit
  const handleClickEditSave = async () => {
    try {
      preloader.show();
      const updateUser = await API.apiUpdateUser(
        Number(valueFormEdit.id),
        valueFormEdit,
      );
      const { message } = updateUser.data;
      await getUSers();
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
      await getUSers();
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
      await getUSers();
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
      <DialogUser
        oncClickSave={handleClickEditSave}
        title={'Edit User'}
        open={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
      >
        {DATA_DIALOG_USER.map((user) => {
          return (
            <TextField
              key={user.id}
              sx={{ pb: 2 }}
              margin="dense"
              id={user.value}
              label={user.label}
              type={user.type}
              fullWidth
              value={valueFormEdit[user.value]}
              onChange={(e) => handleChangeValueEdit(e, user.value)}
            />
          );
        })}
        <Box sx={{ minWidth: 400 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={valueFormEdit.role}
              onChange={(e) => handleChangeValueEdit(e, 'role')}
              label="Role"
            >
              <MenuItem value={1}>Staff</MenuItem>
              <MenuItem value={0}>Admin</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogUser>
      <DialogQuestions
        open={isOpenDelete}
        title={'Delete'}
        content={`Do you want delete user: ${dataDelete.name} ?`}
        handleClose={() => setIsOpenDelete(false)}
        handleAgree={handleAgreeDelete}
      />

      <DialogUser
        oncClickSave={() => validationCreateUser.handleSubmit()}
        title={'Create User'}
        open={isOpenCreate}
        onClose={() => setIsOpenCreate(false)}
      >
        <form>
          {DATA_DIALOG_CREATE_USER.map((user) => {
            return !user.isPicker ? (
              <TextField
                error={
                  validationCreateUser.touched[user.value] &&
                  !!validationCreateUser.errors[user.value]
                }
                helperText={
                  validationCreateUser.touched[user.value] &&
                  validationCreateUser.errors[user.value]
                }
                InputProps={{
                  endAdornment: user.type === 'password' && (
                    <IconButton
                      onClick={() => setIsShowPassword(!isShowPassword)}
                      edge="end"
                    >
                      {isShowPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                key={user.id}
                sx={{ pb: 1 }}
                margin={user.margin}
                id={user.id}
                label={user.label}
                type={
                  user.type === 'password'
                    ? isShowPassword
                      ? 'text'
                      : 'password'
                    : user.type
                }
                fullWidth
                autoComplete={user.autoComplete}
                {...validationCreateUser.getFieldProps(user.value)}
              />
            ) : (
              <MobileDatePicker
                format="DD/MM/YYYY"
                sx={{ pb: 1 }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    error:
                      validationCreateUser.touched[user.value] &&
                      !!validationCreateUser.errors[user.value],
                    helperText:
                      validationCreateUser.touched[user.value] &&
                      validationCreateUser.errors[user.value],
                  },
                }}
                onChange={(date) => {
                  validationCreateUser.setFieldValue(user.value, date);
                }}
              />
            );
          })}
        </form>
      </DialogUser>
    </Container>
  );
};

export default UserPage;
