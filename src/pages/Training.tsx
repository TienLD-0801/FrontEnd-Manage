import { Container } from '@mui/material';
import TrainingWrapper from '@/components/organisms/TrainingWrapper/TrainingWrapper';
import Header from '@/components/atoms/Header/Header';
import { DATA_INFORMATION } from '@/shared/constants/constant';

const Training = () => {
  return (
    <Container id="training">
      <Header />
      <TrainingWrapper dataTraining={DATA_INFORMATION} />
    </Container>
  );
};

export default Training;
