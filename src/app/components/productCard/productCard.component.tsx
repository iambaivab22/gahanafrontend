import React, {useState} from 'react'
import {FaCartArrowDown} from 'react-icons/fa'
import {Chip, HStack, VStack} from 'src/app/common'
import ReactStarsRating from 'react-awesome-stars-rating'
import {useNavigate} from 'react-router-dom'

const productImages = [
  'src/assets/images/products/jewellery-1.jpg',
  'src/assets/images/products/jewellery-2.jpg',
  'src/assets/images/products/jewellery-3.jpg',
  'src/assets/images/products/perfume.jpg'
]

export const ProductCard = () => {
  const [activeImage, setActiveImage] = useState(0)
  const navigate = useNavigate()
  return (
    <div
      className="productCard-container"
      onClick={() => navigate('/product/view/65747fc7eb29c79464248062')}
      onMouseOver={() => setActiveImage(1)}
      onMouseLeave={() => setActiveImage(0)}
    >
      <VStack className="productCard" gap="$3">
        <div className="productCard-image">
          <img src={productImages[activeImage]}></img>
        </div>

        <HStack className="productCard-tags" gap="$2">
          <HStack align="center" gap="$2">
            {/* <p className="">Best Selling</p> */}
            {/* <Chip
              title="Best Selling"
              color="rgb(241 233 214)"
              icon={<FaCartArrowDown size={12} fill="black" />}

              // style={{color: 'black'}}
            ></Chip> */}
            {/* <Chip
              title="New Arrivals"
              color="rgb(219 247 241)"
              icon={<FaCartArrowDown size={12} fill="black" />}

              // style={{color: 'black'}}
            ></Chip> */}
          </HStack>
        </HStack>

        <VStack className="productCard-titleDescription" gap="$2">
          <HStack justify="space-between">
            <p className="productCard-titleDescription-title">Morning Set</p>
          </HStack>
          <div>
            <ReactStarsRating
              size={15}
              value={3}
              primaryColor="hsl(29, 90%, 65%)"
              isEdit={false}

              // secondaryColor="blue"
            />
          </div>
          <HStack align="center" gap="$3">
            <div className="productCard-titleDescription-price">$500.00</div>
            <div
              style={{color: 'hsl(0, 0%, 47%)', textDecoration: 'line-through'}}
            >
              $800
            </div>
          </HStack>

          <p className="productCard-titleDescription-description">
            Lorem ipsum dolor sit
          </p>
        </VStack>

        <HStack
          className="productCard-footer"
          justify="center"
          align="center"
          gap="$3"
        >
          <div>
            <FaCartArrowDown size={20} fill="white" />
          </div>
          <div className="productCard-footer-right">Add to cart</div>
        </HStack>
      </VStack>
    </div>
  )
}
