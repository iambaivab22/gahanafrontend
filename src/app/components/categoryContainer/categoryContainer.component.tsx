import React from 'react'

const CategorryContainers = ({
  imgSrc,
  name,
  linkValue
}: {
  imgSrc: string
  name: string
  linkVallue: string
}) => {
  const navigate = useNavigate()
  return (
    <div
      className="CategoryContainer"
      onClick={() => {
        navigate(linkValue)
      }}
    >
      <div className="categoryCont">
        <div className="categoryImageContainer">
          <div className="categoryImage">
            <div className="categoryImage-image">
              <img src={imgSrc}></img>
            </div>
          </div>
        </div>

        <div className="categoryImage-title">{name}</div>
      </div>
    </div>
  )
}

import {useState, useEffect} from 'react'

import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination, Navigation} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import {useMedia, useQuery} from 'src/hooks'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import {WatchAndShopCard} from '../watchAndShop/watchAndShop.component'
import {IoClose} from 'react-icons/io5'
import {FILE_URL} from 'src/config'
import {useNavigate} from 'react-router-dom'

export const CategoryContainer = ({data}: {data: any}) => {
  const query = useQuery()
  const media = useMedia()
  const [slidesToShow, setSlidesToShow] = useState(5)
  const [activeItem, setActiveItem] = useState(1)
  const isCarouselOcrActive = query.isOcr === 'true'
  const isFolderSearchActive = query.isFolderSearch === 'true'
  const isQuickSummaryActive = query.isQuickSummary === 'true'

  const isDataExtractionActive = query.isAidataExtraction === 'true'

  const [isFullScreen, setIsFullScreen] = useState(false)
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)

  useEffect(() => {
    media?.xs && setSlidesToShow(3)
    media?.sm && setSlidesToShow(3)
    media?.md && setSlidesToShow(3)
    media?.lg && setSlidesToShow(4)
    media?.xl && setSlidesToShow(5)
  }, [media.xl, media.lg, media.md, media.sm])

  const handleCarouselClick = (item) => {
    setActiveItem(item)
  }

  return (
    <div className="productCarouselContainer">
      <div className="productCarousel">
        <div className="productCarousel-slider">
          <div
            className="swiper-button-prev-custom"
            onClick={() =>
              setActiveItem((prev) => {
                if (prev === 1) {
                  handleCarouselClick(data.length)
                  return data.length
                } else {
                  handleCarouselClick(prev - 1)
                  return prev - 1
                }
              })
            }
          >
            <IoIosArrowBack size={18} />
          </div>
          <Swiper
            slidesPerView={slidesToShow}
            spaceBetween={30}
            loop={true}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom'
            }}
            modules={[Pagination, Navigation]}
          >
            {data?.map((item: any, index: number) => {
              const mainImage = item?.image?.replace('uploads/', '')
              console.log(item.name, item, mainImage, 'item.image')
              return (
                <SwiperSlide key={item.id}>
                  <CategorryContainers
                    imgSrc={`${FILE_URL}/${mainImage}`}
                    name={item.name}
                    linkValue={`/products?categoryId=${item.id}&categoryname=${item.name}`}
                  />
                </SwiperSlide>
              )
              // )
            })}

            {/* 
            {productCarouselData?.map((item: any, index: number) => (
              <SwiperSlide key={item.id}>
                <div
                  className="eachProduct"
                  onClick={() => {
                    setActiveItem(item.id)
                    handleCarouselClick(item.id)
                  }}
                >
                  <div
                    className={
                      item.id === activeItem && media.md
                        ? 'eachProduct-gif-active'
                        : 'eachProduct-gif'
                    }
                  >
                    <img
                      src={item.image}
                      alt="active-features"
                      className="eachProduct-gif-img"
                    />
                  </div>
                  <div className="eachProduct-name">{item.title}</div>
                </div>
              </SwiperSlide>
            ))} */}
          </Swiper>
          <div
            className="swiper-button-next-custom"
            onClick={() =>
              setActiveItem((prev) => {
                if (prev === data?.length) {
                  handleCarouselClick(1)
                  return 1
                } else {
                  handleCarouselClick(prev + 1)

                  return prev + 1
                }
              })
            }
          >
            <IoIosArrowForward size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}
