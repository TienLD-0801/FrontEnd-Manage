import { Container } from '@mui/material';
import LoginWrapper from '@/components/admin/organisms/LoginWrapper/LoginWrapper';
import { useContext } from 'react';
import API from '@/services/axiosClient';
import { useDispatch } from 'react-redux';
import { AlertDialogContext } from '@/context/AlertDialogContext';
import { updateUser } from '@/stores/slices/UserSlice';
import { goTo } from '@/routers/router';
import { ROUTE_PATH } from '@/shared/constants/constant';
import { LoadingContext } from '@/context/LoadingContext';
import { ParamsLogin } from '@/shared/types/api-type/login';
import _ from 'lodash';
import { useFormik } from 'formik';
import { validationLoginSchema } from '@/shared/validations/auth-validation';

const LoginPage = () => {
  const dispatch = useDispatch();
  const preloader = useContext(LoadingContext);
  const alertDialog = useContext(AlertDialogContext);

  // validation hook
  const validationLogin = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationLoginSchema,
    onSubmit: (value: ParamsLogin) => handleLoginForm(value),
  });

  //handle login form
  const handleLoginForm = async (prams: ParamsLogin) => {
    try {
      preloader.show();
      const response = await API.apiLogin(prams);
      const { token, userInfo } = response.data;
      dispatch(
        updateUser({
          name: userInfo.name,
          email: userInfo.email,
          token: token,
        }),
      );
      goTo(ROUTE_PATH.dashboard);
    } catch (error) {
      const message = _.get(error, 'message', JSON.stringify(error));
      alertDialog.show(message, false);
    } finally {
      preloader.hidden();
    }
  };

  return (
    <Container id="login">
      <LoginWrapper
        validationLogin={validationLogin}
        onClick={() => validationLogin.handleSubmit()}
      />
    </Container>
  );
};

export default LoginPage;
