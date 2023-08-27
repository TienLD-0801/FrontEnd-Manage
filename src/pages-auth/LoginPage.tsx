import { Container } from '@mui/material';
import LoginWrapper from '@/components/admin/organisms/LoginWrapper/LoginWrapper';
import { useContext } from 'react';
import API from '@/services/axiosClient';
import { useDispatch } from 'react-redux';
import { AlertDialogContext } from '@/context/AlertDialogContext';
import { updateUser } from '@/store/slices/UserSlice';
import { goTo } from '@/ts/router';
import { ROUTE_PATH } from '@/constants/constant';
import { LoadingContext } from '@/context/LoadingContext';
import { ParamsLogin } from '@/api_type/Login/login';
import _ from 'lodash';
import { useFormik } from 'formik';
import { validationLoginSchema } from '@/validations/auth_validation';

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
