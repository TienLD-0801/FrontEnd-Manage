import { DataIntroduceType } from '@/constants/constant';
import IntroduceItem from '@/components/molecules/IntroduceItem/IntroduceItem';
import './IntroduceWrapper.scss';

interface IntroduceWrapper {
  introduce: DataIntroduceType[];
}

const IntroduceWrapper = ({ introduce }: IntroduceWrapper) => {
  return (
    <div className="row grid-demo">
      {introduce.map((e) => (
        <div key={e.id}>
          <IntroduceItem img={e.img} title={e.title} content={e.description} />
        </div>
      ))}
    </div>
  );
};

export default IntroduceWrapper;
