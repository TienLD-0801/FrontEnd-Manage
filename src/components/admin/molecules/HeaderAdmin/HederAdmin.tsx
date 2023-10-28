import {
  SettingsOutlined,
  NotificationsNoneOutlined,
  Menu,
} from '@mui/icons-material';
import './HeaderAdmin.scss';

interface HeaderAdminProps {
  onClickProfile: (event: React.MouseEvent<HTMLElement>) => void;
  open: boolean;
  onClickScale: () => void;
  onChangeLanguage: (event: React.MouseEvent<HTMLElement>) => void;
  languageName: string;
}

const HeaderAdmin = ({
  onClickProfile,
  open,
  onClickScale,
  onChangeLanguage,
  languageName,
}: HeaderAdminProps) => {
  return (
    <div className="header-admin">
      <div className="header-admin__logo">
        <img src="logo.png" style={{ height: 50, width: 50 }} />
        <div className="header-admin__logo__title">BARBER</div>
        <div className="header-admin__logo__menu" onClick={onClickScale}>
          <Menu sx={{ fontSize: 25 }} />
        </div>
      </div>
      <div className="header-admin__language" onClick={onChangeLanguage}>
        <div className="header-admin__language__name">{languageName}</div>
      </div>
      <div className="header-admin__notification">
        <NotificationsNoneOutlined
          sx={{
            fontSize: 25,
          }}
        />
      </div>
      <div
        className="header-admin__toggle"
        onClick={onClickProfile}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <div className="header-admin__toggle__avatar">
          <img
            alt="user-account"
            src="https://www.berrydashboard.io/static/media/user-round.13b5a31bebd2cc6016d6db2cac8e92d1.svg"
          />
        </div>
        <div className="header-admin__toggle__setting">
          <SettingsOutlined fontSize="medium" />
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
