import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '@/stores/slices/UserSlice';
import { goTo } from '@/routers/router';
import { DATA_DASHBOARD, ROUTE_PATH } from '@/shared/constants/constant';
import { useLocation } from 'react-router-dom';
import HeaderAdmin from '@/components/admin/molecules/HeaderAdmin/HederAdmin';
import ProfileDropdown from '@/components/admin/atoms/ProfileDropdown/ProfileDropdown';
import { RootStatesType } from '@/stores';
import { updateScale } from '@/stores/slices/ScaleMenuSlice';
import LanguageDropdown from '@/components/admin/atoms/LanguageDropdown/LanguageDropdown';
import { updateLanguage } from '@/stores/slices/LanguageSlice';
import './DashboardWrapper.scss';
import { useTranslation } from 'react-i18next';

interface DashboardWrapperProps {
  children: React.ReactNode;
}

const DashboardWrapper = (props: DashboardWrapperProps) => {
  const { t } = useTranslation();
  const userInfo = useSelector((state: RootStatesType) => state.user);
  const scale = useSelector((state: RootStatesType) => state.scale.value);
  const activeLanguage = useSelector(
    (state: RootStatesType) => state.language.value,
  );
  const dispatch = useDispatch();
  // hook location
  const location = useLocation();
  // state router
  const [_, setRouter] = useState<string>(ROUTE_PATH.dashboard);

  // handle click navigator
  const handleNavigate = (router: string) => {
    setRouter(router);
    goTo(router);
  };

  const onClickLogout = () => {
    dispatch(
      updateUser({
        name: '',
        email: '',
        token: '',
      }),
    );
    goTo(ROUTE_PATH.login);
  };

  // handle open setting profile
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const onClickProfile = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // handle open setting language
  const [languageEl, setLanguageEl] = useState<null | HTMLElement>(null);
  const openLanguageMenu = Boolean(languageEl);
  const onChangeLanguage = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageEl(event.currentTarget);
  };
  const handleCloseLanguage = () => {
    setLanguageEl(null);
  };

  const onClickScale = () => {
    dispatch(updateScale());
  };

  const onChooseLanguage = (value: string) => {
    dispatch(updateLanguage({ value: value }));
    setLanguageEl(null);
  };

  return (
    <div className="dash-board" style={{ display: 'flex', height: '100%' }}>
      <HeaderAdmin
        onClickProfile={onClickProfile}
        open={open}
        languageName={activeLanguage}
        onClickScale={onClickScale}
        onChangeLanguage={onChangeLanguage}
      />
      <div className="dash-board__container">
        {scale ? (
          <div className={`dash-board__container__menu`}>
            {DATA_DASHBOARD.map((e) => {
              return (
                <div
                  key={e.id}
                  className={
                    location.pathname === e.router
                      ? 'dash-board__container__menu__focus'
                      : 'dash-board__container__menu__unfocus'
                  }
                  onClick={() => handleNavigate(e.router)}
                >
                  <e.icon
                    style={{
                      color:
                        location.pathname === e.router ? 'violet' : 'black',
                    }}
                    fontSize="medium"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="admin-wrapper">
            <div className="admin-wrapper__title">{t('dashboard.title')}</div>
            <div className="admin-wrapper__content">
              <div className="admin-wrapper__content__item__text">
                {DATA_DASHBOARD.map((dashboard) => {
                  return (
                    <div
                      key={dashboard.id}
                      className={
                        location.pathname === dashboard.router
                          ? 'admin-wrapper__content__item__text__focus'
                          : 'admin-wrapper__content__item__text__unfocus'
                      }
                      onClick={() => handleNavigate(dashboard.router)}
                    >
                      <dashboard.icon
                        style={{
                          color:
                            location.pathname === dashboard.router
                              ? 'violet'
                              : 'black',
                        }}
                        fontSize="medium"
                      />
                      <div
                        className={
                          location.pathname === dashboard.router
                            ? 'admin-wrapper__content__item__text__title'
                            : 'admin-wrapper__content__item__text__disable'
                        }
                      >
                        {scale ? '' : t(dashboard.text)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        <div {...props} className="dash-board__container__content"></div>
      </div>
      <ProfileDropdown
        name={userInfo.name == null ? 'update later' : userInfo.name}
        email={userInfo.email}
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        onClickLogout={onClickLogout}
      />
      <LanguageDropdown
        active={activeLanguage}
        anchorEl={languageEl}
        open={openLanguageMenu}
        handleClose={handleCloseLanguage}
        onChooseLanguage={(value) => onChooseLanguage(value)}
      />
    </div>
  );
};

export default DashboardWrapper;
