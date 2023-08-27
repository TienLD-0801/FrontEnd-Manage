import Button from '@/components/atoms/Button/Button';
import './NotFoundWrapper.scss';

interface NotFoundWrapperProps {
  onClickGoHome: () => void;
}

const NotFoundWrapper = ({ onClickGoHome }: NotFoundWrapperProps) => {
  return (
    <div className="not-found">
      <div className="not-found__bg"></div>
      <div className="not-found__content">
        <div className="not-found__content__404">404</div>
        <div className="not-found__content__title">Page Not Found.</div>
        <Button onClick={onClickGoHome} classes="not-found__content__btn-home">
          GO HOME
        </Button>
      </div>
    </div>
  );
};

export default NotFoundWrapper;
