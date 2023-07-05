import React, { useLayoutEffect, useRef } from 'react';
import SwiperCore, { Controller, FreeMode, Navigation, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperClass from 'swiper/types/swiper-class';

import { ProductImage } from '@/pages/product/types';
import { useState } from 'react';

export const ProductCarousel = ({ images }: { images: ProductImage[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();
  const [firstSwiper, setFirstSwiper] = useState<SwiperClass>();
  const [secondSwiper, setSecondSwiper] = useState<SwiperClass>();
  const swiper1Ref = useRef<React.MutableRefObject<null>>(null);
  const swiper2Ref = useRef();

  useLayoutEffect(() => {
    if (swiper1Ref.current !== null) {
      // @ts-ignore
      swiper1Ref.current.controller.control = swiper2Ref.current;
    }
  }, []);

  return (
    <div className="h-auto w-2/5">
      <Swiper
        onSwiper={(swiper) => {
          if (swiper1Ref.current !== null) {
            // @ts-ignore
            swiper1Ref.current = swiper;
          }
        }}
        controller={{ control: secondSwiper }}
        spaceBetween={10}
        slidesPerView={1}
        grabCursor={true}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Controller]}
        className="h-[754px] w-[448px] rounded-xl"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <img
              src={image.imgUrl}
              className="h-[754px] w-[448px] rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        controller={{ control: firstSwiper }}
        loop={false}
        spaceBetween={10}
        slidesPerView={images.length}
        watchSlidesProgress
        touchRatio={0.2}
        slideToClickedSlide={true}
        onSwiper={setThumbsSwiper}
        modules={[Navigation, Thumbs, Controller]}
        className="mt-[20px] h-[120.4px] w-auto rounded-xl"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} className="cursor-pointer">
            <img src={image.imgUrl} className="h-[164px] w-[178px]" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
