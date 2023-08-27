import ReactDOM from 'react-dom';
import './SearchDialog.scss';

interface SearchDialogProps {
  handleCloseSearchDialog: () => void;
}

const SearchDialog = (props: SearchDialogProps) => {
  return ReactDOM.createPortal(
    <div className="wrapper_search">
      <div className="wrapper_search">
        <div className="text_search">
          <input type="text" className="search" placeholder="Search...." />
        </div>
      </div>
      <div className="wrapper_img-close">
        <img
          src="./close.png"
          alt="close"
          className="img-close"
          onClick={props.handleCloseSearchDialog}
        />
      </div>
    </div>,
    document.querySelector('body')!,
  );
};

export default SearchDialog;
