import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { DataSlideType } from '@/shared/constants/constant';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import './HomeWrapper.scss';

interface HomeWrapperProps {
  slideData: DataSlideType[];
}

const HomeWrapper = ({ slideData }: HomeWrapperProps) => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={100}
      slidesPerView={1}
      navigation
      autoplay={{ delay: 1000 }}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {slideData.map((e) => (
        <SwiperSlide key={e.id}>
          <img className="slide_img" src={e.img} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default HomeWrapper;
