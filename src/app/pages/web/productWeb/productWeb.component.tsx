import React, {useState} from 'react'
import {AiOutlineSortAscending} from 'react-icons/ai'
import {
  CustomModal,
  HStack,
  InputField,
  Modal,
  Title,
  VStack
} from 'src/app/common'
import {getNprPrice} from 'src/helpers/nprPrice.helper'

export const ProductListForWeb = () => {
  const [sortVisible, setSortVisible] = useState(false)
  return (
    <HStack justify="space-between">
      <VStack style={{width: '30%'}}>
        <ProductListSideComp></ProductListSideComp>
        <VStack>
          <HStack>
            <VStack>
              <CustomModal
                displayElement={
                  <p style={{border: '2px solid red', position: 'relative'}}>
                    Sort
                  </p>
                }
              >
                {(onCloseModalHandler) => {
                  return (
                    <VStack>
                      <HStack align="center" gap="$3">
                        <AiOutlineSortAscending></AiOutlineSortAscending>
                        <p>Asc (price low to high)</p>
                      </HStack>
                      <HStack align="center" gap="$3">
                        <AiOutlineSortAscending></AiOutlineSortAscending>
                        <p>Desc (price hight to low)</p>
                      </HStack>
                      <HStack align="center" gap="$3">
                        <AiOutlineSortAscending></AiOutlineSortAscending>
                        <p>Asc (Product Name A to Z)</p>
                      </HStack>
                      <HStack align="center" gap="$3">
                        <AiOutlineSortAscending></AiOutlineSortAscending>
                        <p>Desc (Product Name A to Z)</p>
                      </HStack>
                    </VStack>
                  )
                }}
              </CustomModal>
            </VStack>
          </HStack>
          <VStack></VStack>
        </VStack>
      </VStack>
      <VStack style={{width: '50%'}}></VStack>
    </HStack>
  )
}

export const ProductListSideComp = () => {
  const [minMaxPrice, setMinMaxPrice] = useState({minPrice: 0, maxPrice: 20000})
  return (
    <>
      <ProductPriceSlider />
      <HStack style={{width: '100%'}} gap="$3" align="center">
        <VStack gap="$2">
          <Title subheading>FROM</Title>
          <InputField
            // style={{width: '40%'}}
            type="number"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              console.log(e.target.value, 'value changes hai')
              setMinMaxPrice((prev: any) => ({
                ...prev,
                minPrice: e.target.value
              }))
            }}
            placeholder="Enter minimum price"
            value={minMaxPrice.minPrice}
          ></InputField>
        </VStack>
        <HStack justify="center" align="center">
          -
        </HStack>
        <VStack gap="$2">
          <Title subheading>TO</Title>
          <InputField
            // style={{width: '40%'}}
            type="number"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              console.log(e.target.value, 'value changes hai')
              setMinMaxPrice((prev: any) => ({
                ...prev,
                maxPrice: e.target.value
              }))
            }}
            placeholder="Enter max price"
            value={minMaxPrice.maxPrice}
          ></InputField>
        </VStack>
      </HStack>
    </>
  )
}

export const ProductPriceSlider = () => {
  const [priceRnage, setPriceRange] = useState({
    minPrice: 50,
    maxPrice: 1000
  })

  return (
    <div style={{position: 'relative'}} className="productWeb-container"></div>
  )
}
