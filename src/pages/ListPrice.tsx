import { Container } from '@mui/material';
import Header from '@/components/atoms/Header/Header';
import ListPriceWrapper from '@/components/organisms/ListPriceWrapper/ListPriceWrapper';

const ListPrice = () => {
  return (
    <Container id="price">
      <Header />
      <ListPriceWrapper />
    </Container>
  );
};

export default ListPrice;
