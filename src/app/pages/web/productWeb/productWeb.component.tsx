import React, {useEffect, useRef, useState} from 'react'
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
  const sortRef = useRef<HTMLDivElement | null>(null)
  const modalButtonRef = useRef<any>(null)
  const handleOutSideClick = (event) => {
    if (
      sortRef.current &&
      !sortRef.current.contains(event.target) &&
      event.target !== document.getElementById('openModalButton')
    ) {
      setSortVisible(false)
    } else {
      console.log(sortVisible, 'called')
      // !!sortVisible && setSortVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOutSideClick)

    return () => {
      document.removeEventListener('click', handleOutSideClick)
    }
  }, [])
  return (
    <HStack justify="space-between" style={{width: '100%'}}>
      <VStack style={{width: '30%'}}>
        <ProductListSideComp></ProductListSideComp>
        <VStack>
          <HStack></HStack>
          <VStack></VStack>
        </VStack>
      </VStack>
      <HStack style={{flex: 1}} justify="space-between" align="center">
        <VStack>Products</VStack>
        <div>
          <VStack className="sortMainContainer">
            <div
              id="openModalButton"
              onClick={() => setSortVisible((prev) => !prev)}
            >
              Sort
            </div>

            <div
              className="sortModalContainer"
              style={{scale: sortVisible ? '1' : '0'}}
              ref={sortRef}
            >
              <VStack>
                <HStack align="center" gap="$3" className="filterItem">
                  <AiOutlineSortAscending></AiOutlineSortAscending>
                  <p>Asc (price low to high)</p>
                </HStack>
                <HStack align="center" gap="$3" className="filterItem">
                  <AiOutlineSortAscending></AiOutlineSortAscending>
                  <p>Desc (price hight to low)</p>
                </HStack>
                <HStack align="center" gap="$3" className="filterItem">
                  <AiOutlineSortAscending></AiOutlineSortAscending>
                  <p>Asc (Product Name A to Z)</p>
                </HStack>
                <HStack align="center" gap="$3" className="filterItem">
                  <AiOutlineSortAscending></AiOutlineSortAscending>
                  <p>Desc (Product Name A to Z)</p>
                </HStack>
              </VStack>
            </div>
          </VStack>
        </div>
      </HStack>
    </HStack>
  )
}

export const ProductListSideComp = () => {
  const [minMaxPrice, setMinMaxPrice] = useState({minPrice: 0, maxPrice: 20000})
  return (
    <HStack align="center" justify="space-between" style={{width: '100%'}}>
      {/* <ProductPriceSlider /> */}
      <HStack
        style={{width: '90%'}}
        gap="$3"
        align="center"
        justify="center
      "
      >
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
    </HStack>
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
