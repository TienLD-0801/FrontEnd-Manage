import { DataTrainingType } from '@/constants/constant';
import './TrainingWrapper.scss';

interface TrainingWrapperProps {
  dataTraining: DataTrainingType[];
}

const TrainingWrapper = ({ dataTraining }: TrainingWrapperProps) => {
  return (
    <div className="informationWrapper">
      <h1 className="informationTitle"> THÔNG TIN KHOÁ HỌC</h1>
      <div className="wrapperItem">
        <div className="wrapper">
          {dataTraining.map((e) => (
            <div className="item" key={e.id}>
              <img alt={e.icon}></img>
              <p className="itemTitle">{e.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainingWrapper;
