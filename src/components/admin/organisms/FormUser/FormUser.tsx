import { Fragment } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@mui/material';
import { FORMAT_INPUT } from '@/shared/constants/date';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import DialogForm from '@/components/admin/atoms/DialogForm/DialogForm';
import DatePicker from '@/components/admin/atoms/DatePicker/DatePicker';
import CustomTextField from '@/components/admin/atoms/CustomTextField/CustomTextField';
import {
  DataDialogCreateUserType,
  DataDialogEditUserType,
} from '@/shared/constants/constant';
import {
  ValidationCreateUserType,
  ValidationEditUserType,
} from '@/shared/validations/type-formik/user';

interface FormUserProps {
  validationCreateUser: ValidationCreateUserType;
  validationEditUser: ValidationEditUserType;
  isOpenCreateUser: boolean;
  onCloseCreateUser: () => void;
  dataDialogCreateUser: DataDialogCreateUserType[];
  dataDialogEditUser: DataDialogEditUserType[];
  isShowPassword: boolean;
  isOpenEditUser: boolean;
  onCloseEditUser: () => void;
  isOpenDeleteUser: boolean;
  onCloseDeleteUser: () => void;
  dataDeleteUser: { id: string; name: string };
  onClickSaveDeleteUser: () => void;
  onShowPassword: () => void;
}

const FormUser = ({
  validationCreateUser,
  validationEditUser,
  isOpenCreateUser,
  onCloseCreateUser,
  dataDialogCreateUser,
  isShowPassword,
  isOpenEditUser,
  onCloseEditUser,
  isOpenDeleteUser,
  onCloseDeleteUser,
  dataDeleteUser,
  dataDialogEditUser,
  onClickSaveDeleteUser,
  onShowPassword,
}: FormUserProps) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      {/* create form */}
      <DialogForm
        onClickSave={() => validationCreateUser.handleSubmit()}
        title={t('dialog.user.create.title')}
        open={isOpenCreateUser}
        onClose={onCloseCreateUser}
      >
        <form>
          {dataDialogCreateUser.map((user) => {
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
                    <IconButton onClick={onShowPassword} edge="end">
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
      {/* edit form */}
      <DialogForm
        onClickSave={() => validationEditUser.handleSubmit()}
        title={t('dialog.user.edit.title')}
        open={isOpenEditUser}
        onClose={onCloseEditUser}
      >
        {dataDialogEditUser.map((user) => {
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
        open={isOpenDeleteUser}
        title={t('dialog.user.delete.title')}
        onClose={onCloseDeleteUser}
        onClickSave={onClickSaveDeleteUser}
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
            &nbsp;"{dataDeleteUser.name}"&nbsp;
          </div>
          <div>?</div>
        </div>
      </DialogForm>
    </Fragment>
  );
};

export default FormUser;
