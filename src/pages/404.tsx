import { Container } from '@mui/material';
import NotFoundWrapper from '@/components/organisms/NotFoundWrapper/NotFoundWrapper';
import { goTo } from '@/routers/router';
import { ROUTE_PATH } from '@/shared/constants/constant';

const NotFoundPage = () => {
  return (
    <Container id="not-found">
      <NotFoundWrapper onClickGoHome={() => goTo(ROUTE_PATH.index)} />
    </Container>
  );
};

export default NotFoundPage;
