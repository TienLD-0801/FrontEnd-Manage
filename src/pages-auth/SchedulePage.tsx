import { Container } from '@mui/material';
import ScheduleWrapper from '@/components/admin/organisms/ScheduleWrapper/ScheduleWrapper';
import DashboardWrapper from '@/components/admin/organisms/DashboardWrapper/DashboardWrapper';

const SchedulePage = () => {
  return (
    <Container id="schedule">
      <DashboardWrapper>
        <ScheduleWrapper />
      </DashboardWrapper>
    </Container>
  );
};

export default SchedulePage;
