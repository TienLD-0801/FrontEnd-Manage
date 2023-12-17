import { Pagination } from '@mui/material';

interface PaginationCustomProps {
  count: number;
  page: number;
  onChange: (event: any, page: number) => void;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'standard';
}

const PaginationCustom = ({
  count,
  page,
  onChange,
  showFirstButton = true,
  showLastButton = true,
  className,
  size = 'large',
  color = 'primary',
}: PaginationCustomProps) => {
  return (
    <Pagination
      className={className}
      showFirstButton={showFirstButton}
      showLastButton={showLastButton}
      color={color}
      size={size}
      count={count}
      page={page}
      onChange={onChange}
    />
  );
};

export default PaginationCustom;
