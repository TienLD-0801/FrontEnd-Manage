import { Container } from '@mui/material';
import Header from '@/components/atoms/Header/Header';
import IntroduceWrapper from '@/components/organisms/IntroduceWrapper/IntroduceWrapper';
import { DATA_INTRODUCE } from '@/shared/constants/constant';
import TitleIntroduce from '@/components/organisms/TitleIntroduce/TitleIntroduce';

const Introduce = () => {
  return (
    <Container id="introduce">
      <Header />
      <TitleIntroduce />
      <IntroduceWrapper introduce={DATA_INTRODUCE} />
    </Container>
  );
};

export default Introduce;
