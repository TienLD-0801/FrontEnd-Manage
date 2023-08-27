import SearchDialog from '../SearchDialog/SearchDialog';
import { useState } from 'react';
import { DATA_HEADER } from '@/constants/constant';
import './Header.scss';

const Header = () => {
  const [isShowSearchDialog, setIsShowSearchDialog] = useState(false);

  const handleCloseSearchDialog = () => {
    setIsShowSearchDialog(!isShowSearchDialog);
  };

  return (
    <div className="wrapper_header">
      <a>
        <img src="logo.png" alt="" className="item_logo" />
      </a>
      {DATA_HEADER.map((e) => (
        <div
          onClick={() => {
            // f7.view.main.router.navigate(e.routerName!);
          }}
          className="color-theme-black title_text"
          key={e.id}
        >
          {e.name}
        </div>
      ))}
      <span className="separate">|</span>

      <div className="wrapper_fb">
        <a href="https://www.youtube.com/" target="_blank">
          <img src="fb.png" alt="" className="fb_Image " />
        </a>
        <a>
          <img src="tik_tok.png" alt="" className="fb_Image" />
        </a>
        <a>
          <img
            src="search.png"
            alt=""
            className="fb_Image"
            onClick={handleCloseSearchDialog}
          />
        </a>
      </div>
      {isShowSearchDialog && (
        <SearchDialog handleCloseSearchDialog={handleCloseSearchDialog} />
      )}
    </div>
  );
};

export default Header;
