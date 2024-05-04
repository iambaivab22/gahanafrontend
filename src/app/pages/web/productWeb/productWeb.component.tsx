import React, {useEffect, useRef, useState} from 'react'
import {AiOutlineSortAscending} from 'react-icons/ai'
import {
  CheckBox,
  CustomModal,
  HStack,
  InputField,
  Modal,
  Title,
  VStack
} from 'src/app/common'
import {getNprPrice} from 'src/helpers/nprPrice.helper'
import {useDispatch, useSelector} from 'src/store'
import {getCategoryListAction} from '../../category/category.slice'
import {getProductListAction} from '../../products/product.slice'
import {ProductCard} from 'src/app/components'
import toast from 'react-hot-toast'

export const ProductListForWeb = () => {
  const [sortVisible, setSortVisible] = useState(false)
  const sortRef = useRef<HTMLDivElement | null>(null)
  const modalButtonRef = useRef<any>(null)
  const [sortOrder, setSortOrder] = useState({
    parameter: '',
    order: ''
  })
  const [minMaxRange, setMinMaxRange] = useState({
    minPrice: '',
    maxPrice: ''
  })
  const [selectedCategories, setSelectedCategories] = useState({
    name: '',
    id: null
  })

  const dispatch = useDispatch()

  const {data}: any = useSelector((state: any) => state.product)

  console.log(data, 'data from ps')

  useEffect(() => {
    console.log('api hit')
    dispatch(
      getProductListAction({
        onSuccess: () => {},
        query: {
          sort: sortOrder.parameter,
          order: sortOrder.order,
          categoryId: selectedCategories.id
        }
      })
    )
  }, [sortOrder.order, sortOrder.parameter, selectedCategories.id])

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
    <HStack
      justify="space-between"
      style={{width: '100%', minHeight: '40vh'}}
      className="productWebPage-container"
    >
      <VStack style={{width: '30%'}}>
        <ProductListSideComp
          selectedCategories={selectedCategories}
          onCategoryChange={({id, name}) => {
            setSelectedCategories((prev) => ({
              id: id,
              name: name
            }))
          }}
        ></ProductListSideComp>
        <VStack>
          <HStack></HStack>
          <VStack></VStack>
        </VStack>
      </VStack>
      <HStack style={{flex: 1}} justify="space-between" align="flex-start">
        <VStack gap="$3">
          <Title subheading>Products</Title>
          <HStack align="center" justify="space-between" gap="$4">
            {data?.map((item: any, index: number) => {
              return <ProductCard data={item} key={item.id} />
            })}
          </HStack>
        </VStack>
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
                <HStack
                  align="center"
                  gap="$3"
                  className="filterItem"
                  onClick={() => {
                    setSortOrder((prev) => {
                      return {...prev, parameter: 'price', order: 'asc'}
                    })
                  }}
                >
                  <AiOutlineSortAscending></AiOutlineSortAscending>
                  <p>Asc (price low to high)</p>
                </HStack>
                <HStack
                  align="center"
                  gap="$3"
                  className="filterItem"
                  onClick={() => {
                    setSortOrder((prev) => {
                      return {...prev, parameter: 'price', order: 'desc'}
                    })
                  }}
                >
                  <AiOutlineSortAscending></AiOutlineSortAscending>
                  <p>Desc (price hight to low)</p>
                </HStack>
                <HStack
                  align="center"
                  gap="$3"
                  className="filterItem"
                  onClick={() => {
                    setSortOrder((prev) => {
                      return {...prev, parameter: 'name', order: 'asc'}
                    })
                  }}
                >
                  <AiOutlineSortAscending></AiOutlineSortAscending>
                  <p>Asc (Product Name A to Z)</p>
                </HStack>
                <HStack
                  align="center"
                  gap="$3"
                  className="filterItem"
                  onClick={() => {
                    setSortOrder((prev) => {
                      return {...prev, parameter: 'name', order: 'desc'}
                    })
                  }}
                >
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

export const ProductListSideComp = ({
  onCategoryChange,
  selectedCategories
}: {
  onCategoryChange: ({id, name}: {id: string; name: string}) => void
  selectedCategories: {
    id: string
    name: string
  }
}) => {
  const {categoryData}: any = useSelector((state: any) => state.category)
  console.log(selectedCategories, 'selected catogories')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      getCategoryListAction({
        onSuccess: () => console.log('categoryList fetch Successfully')
      })
    )
  }, [])

  console.log(categoryData, 'categorydata')
  const [minMaxPrice, setMinMaxPrice] = useState({minPrice: 0, maxPrice: 20000})

  return (
    <VStack
      align="flex-start"
      justify="space-between"
      style={{width: '100%'}}
      gap="$4"
    >
      {/* <ProductPriceSlider /> */}
      <VStack align="flex-start" justify="flex-start">
        <Title primaryHeading>Categories</Title>
        {categoryData?.map((item, index) => {
          return (
            <CheckBox
              name={item.name}
              label={item.name}
              handleCheckboxChange={() =>
                onCategoryChange({id: item.id, name: item.name})
              }
              check={item.name === selectedCategories.name}
            />
          )
        })}
      </VStack>
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
    </VStack>
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
