import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '@/store/slices/UserSlice';
import { goTo } from '@/ts/router';
import { DATA_DASHBOARD, ROUTE_PATH } from '@/constants/constant';
import { useLocation } from 'react-router-dom';
import HederAdmin from '@/components/admin/molecules/HeaderAdmin/HederAdmin';
import ProfileDropdown from '@/components/admin/atoms/ProfileDropdown/ProfileDropdown';
import { RootStatesType } from '@/store';
import './DashboardWrapper.scss';
import { updateScale } from '@/store/slices/ScaleMenuSlice';

interface DashboardWrapperProps {
  children: React.ReactNode;
}

const DashboardWrapper = (props: DashboardWrapperProps) => {
  const userInfo = useSelector((state: RootStatesType) => state.user);
  const scale = useSelector((state: RootStatesType) => state.scale.value);
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

  const onClickScale = () => {
    dispatch(updateScale());
  };

  return (
    <div className="dash-board" style={{ display: 'flex', height: '100%' }}>
      <HederAdmin
        onClickProfile={onClickProfile}
        open={open}
        onClickScale={onClickScale}
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
            <div className="admin-wrapper__title">Dashboard</div>
            <div className="admin-wrapper__content">
              <div className="admin-wrapper__content__item__text">
                {DATA_DASHBOARD.map((e) => {
                  return (
                    <div
                      key={e.id}
                      className={
                        location.pathname === e.router
                          ? 'admin-wrapper__content__item__text__focus'
                          : 'admin-wrapper__content__item__text__unfocus'
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
                      <div
                        className={
                          location.pathname === e.router
                            ? 'admin-wrapper__content__item__text__title'
                            : 'admin-wrapper__content__item__text__disable'
                        }
                      >
                        {scale ? '' : e.text}
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
    </div>
  );
};

export default DashboardWrapper;
