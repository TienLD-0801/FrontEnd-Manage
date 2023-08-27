import './IntroduceItem.scss';

interface IntroduceItemProps {
  img: string;
  title: string;
  content: string;
}

const IntroduceItem = ({ img, title, content }: IntroduceItemProps) => {
  return (
    <a href="https://www.youtube.com/" target="_blank">
      <div className="wrapper-introduce">
        <img className="item_img" src={img} alt="" />
        <div className="item_title">{title}</div>
        <div className="item_description">{content}</div>
      </div>
    </a>
  );
};

export default IntroduceItem;
