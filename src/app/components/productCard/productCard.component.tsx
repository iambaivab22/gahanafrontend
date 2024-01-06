import React from 'react'
import {FaCartArrowDown} from 'react-icons/fa'
import {Chip, HStack, VStack} from 'src/app/common'
import ReactStarsRating from 'react-awesome-stars-rating'
import {useNavigate} from 'react-router-dom'

export const ProductCard = () => {
  const navigate = useNavigate()
  return (
    <div
      className="productCard-container"
      onClick={() => navigate('product/view/3')}
    >
      <VStack className="productCard" gap="$3">
        <div className="productCard-image">
          <img src="/src/assets/images/banner1.webp"></img>
        </div>

        <HStack className="productCard-tags" gap="$2">
          <HStack align="center" gap="$2">
            {/* <p className="">Best Selling</p> */}
            <Chip
              title="Best Selling"
              color="rgb(241 233 214)"
              icon={<FaCartArrowDown size={12} fill="black" />}

              // style={{color: 'black'}}
            ></Chip>
            <Chip
              title="New Arrivals"
              color="rgb(219 247 241)"
              icon={<FaCartArrowDown size={12} fill="black" />}

              // style={{color: 'black'}}
            ></Chip>
          </HStack>
        </HStack>

        <VStack className="productCard-titleDescription" gap="$2">
          <HStack justify="space-between">
            <p className="productCard-titleDescription-title">Morning Set</p>
            <ReactStarsRating
              size={15}
              value={3}
              primaryColor="red"
              isEdit={false}

              // secondaryColor="blue"
            />
          </HStack>
          <div className="productCard-titleDescription-price">$500.00</div>
          <p className="productCard-titleDescription-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
            voluptates, quaerat maxime officiis
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
