import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// import Image from 'next/image'

// import banner1 from 'src/public/assets/image/banner1.webp'
// import banner2 from 'src/public/assets/image/banner2.webp'
// import banner3 from 'src/public/assets/image/banner3.webp'

import banner3 from 'src/assets/images/banner1.webp'
import banner1 from 'src/assets/images/banner2.webp'
import banner2 from 'src/assets/images/banner3.webp'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export const MainCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  }

  const backgroundImage = [banner1, banner2, banner3]

  return (
    <div className="carouselContainers">
      <Slider className="slider" adaptiveHeight {...settings}>
        {backgroundImage.map((item: any, index: number) => {
          return (
            <div className="image-container" key={index}>
              <img
                src={item}
                alt="image"
                placeholder="blur"
                // blurDataURL={item}
                // objectFit="cover"
                // objectPosition={'top center'}
                // layout="fill"
              ></img>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}
