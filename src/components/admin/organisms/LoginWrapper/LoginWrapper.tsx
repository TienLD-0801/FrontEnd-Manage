import { useState } from 'react';
import Button from '@/components/atoms/Button/Button';
import { useTranslation } from 'react-i18next';
import { IconButton, TextField } from '@mui/material';
import { TEXT_FIELD_LOGIN } from '@/constants/constant';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormikProps } from 'formik';
import { ParamsLogin } from '@/api_type/login';
import './LoginWrapper.scss';

interface LoginWrapperProps {
  onClick?: () => void;
  validationLogin: FormikProps<ParamsLogin>;
}

const LoginWrapper = ({ onClick, validationLogin }: LoginWrapperProps) => {
  const { t } = useTranslation();
  const [isShowPass, setIsShowPass] = useState<boolean>(false);

  return (
    <div className="login-box">
      <div className="login-box__form">
        <div className="login-box__form__title">{t('login.title')}</div>
        <form className="login-box__form__container">
          {TEXT_FIELD_LOGIN.map((form) => {
            return (
              <TextField
                key={form.id}
                error={
                  validationLogin.touched[form.value] &&
                  !!validationLogin.errors[form.value]
                }
                helperText={
                  validationLogin.touched[form.value] &&
                  validationLogin.errors[form.value]
                }
                sx={{ pb: 2 }}
                label={form.label}
                type={
                  form.type === 'password'
                    ? isShowPass
                      ? 'text'
                      : 'password'
                    : form.type
                }
                InputProps={{
                  endAdornment: form.type === 'password' && (
                    <IconButton
                      onClick={() => setIsShowPass(!isShowPass)}
                      edge="end"
                    >
                      {isShowPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                margin={form.margin}
                autoComplete={form.autoComplete}
                fullWidth
                {...validationLogin.getFieldProps(form.value)}
              />
            );
          })}
        </form>
        <Button
          type="button"
          classes="login-box__form__button"
          onClick={onClick}
        >
          {t('login.title')}
        </Button>
      </div>
    </div>
  );
};

export default LoginWrapper;
