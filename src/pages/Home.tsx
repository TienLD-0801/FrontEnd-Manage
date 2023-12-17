import { Container } from '@mui/material';
import Header from '@/components/atoms/Header/Header';
import HomeWrapper from '@/components/organisms/HomeWrapper/HomeWrapper';
import { DATA_SLIDE } from '@/shared/constants/constant';

const HomePage = () => {
  return (
    <Container id="home">
      <Header />
      <HomeWrapper slideData={DATA_SLIDE} />
    </Container>
  );
};

export default HomePage;
