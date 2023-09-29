import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'src/store'

import {useParams} from 'src/hooks'
import {Button, HStack, InputField, Label, SelectField} from 'src/app/common'
import {
  getCategoryListAction,
  getSubCategoryAction
} from '../../category/category.slice'
import {
  createProductAction,
  delteProductImageAction,
  getProductDetailByIdAction,
  getProductListAction,
  updateProductAction
} from '../product.slice'
import {useFormInput} from 'use-form-input'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import ImageUploader from 'src/app/common/imageUploader/imageUploader.common'
import VideoUploader from 'src/app/common/videoUploader/videoUploader.common'
import {useStepContext} from '@mui/material'

export const AddProductPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productId = useParams('productId')
  // console.log(productId, 'productId present')

  useEffect(() => {
    productId &&
      dispatch(getProductDetailByIdAction({productId: productId as string}))
  }, [])

  const {productDetailData, productDetailLoading}: any = useSelector(
    (state: any) => state.product
  )

  // console.log(productDetailData, 'productDetailData')

  // console.log(!!productDetailData, 'product detail data boolean')

  // console.log('product id is available', productId)
  const [data, setData] = useState<any>({
    name: '',
    originalPrice: '',
    discountedPrice: '',
    discountPercentage: '',
    category: '',
    subCategory: '',
    images: '',
    video: null,
    details: ''
  })

  useEffect(() => {
    // console.log('product DetailData called')

    if (productId) {
      setSelectedCategory({
        id: productDetailData?.category?.id,
        label: productDetailData?.category.name,
        value: productDetailData?.category?.value
      })
      setSelectedSubCategory({
        id: productDetailData?.subCategory?.id,
        label: productDetailData?.subCategory.name,
        value: productDetailData?.subCategory?.value
      })
      setData((prev: any) => ({
        ...prev,
        name: productDetailData?.name,
        originalPrice: productDetailData?.originalPrice,
        discountedPrice: !!productDetailData
          ? productDetailData.discountedPrice
          : '',
        discountPercentage: !!productDetailData
          ? productDetailData.discountPercentage
          : '',

        // images: !!productDetailData ? productDetailData.images?.[0] : '',
        // video: !!productDetailData ? productDetailData.video : null,
        details: !!productDetailData ? productDetailData.details : ''
      }))
    }
  }, [productDetailData])

  const [selectedCategory, setSelectedCategory] = useState<any>()
  const [selectedSubCategory, setSelectedSubCategory] = useState<any>()
  const [category, setCategory] = useState<any>()
  const [subCategory, setSubCategory] = useState<any>()

  const {
    categoryData,
    getCategoryLoading,
    subCategoryData,
    getSubCategoryLoading
  }: any = useSelector((state: any) => state.category)

  const {createProductLoading, updateProductLoading}: any = useSelector(
    (state: any) => state.product
  )

  useEffect(() => {
    dispatch(
      getCategoryListAction({
        onSuccess: () => console.log('categoryList fetch Successfully')
      })
    )
  }, [])

  useEffect(() => {
    const mappedCategory = categoryData?.map((item: any, index: number) => {
      // console.log(item, 'caetgory item')
      return {
        id: item.id,
        label: item.name,
        value: item.name,
        subCategory: item.subCategories
      }
    })
    // console.log(mappedCategory, 'mapped category')
    setCategory(mappedCategory)
  }, [categoryData])

  useEffect(() => {
    // console.log('selcted category changed')
    // console.log('subcategory resetting')

    const mappedSubCategory = selectedCategory?.subCategory?.map(
      (item: any, index: number) => {
        return {
          id: item.id,
          label: item.name,
          value: item.name
        }
      }
    )

    setSubCategory(mappedSubCategory)
  }, [selectedCategory])

  const handleImage = (event: any) => {
    // console.log(event.target.files, 'event target files')

    const selectedFiles = Array.from(event.target.files)
    // console.log(event.target.files, 'event.target.files')
    // console.log(selectedFiles, 'seelctedFiles')
    console.log(selectedFiles, 'selectedFilesss addProduct')
    setData((prev: any) => ({...prev, images: selectedFiles}))
  }

  useEffect(() => {
    console.log(data, 'data')
  }, [data])

  useEffect(() => {
    console.log(productDetailData, 'product detail datga changed')
  }, [productDetailData])

  const handleAction = (imageId: string) => {
    console.log('product id called dfsdfsdfdf', productId)
    dispatch(
      delteProductImageAction({
        productId: productId as string,
        imageId: imageId as string,
        onSuccess: () => {
          toast.success('product delete')
        }
      })
    )
  }

  const handleVideo = (event: any) => {
    setData((prev) => ({...prev, video: event.target.files[0]}))
  }

  const addProductHandler = (event: any) => {
    event.preventDefault()

    console.log('addProduct called')

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('category', selectedCategory.id)
    formData.append('subCategory', selectedSubCategory.id)
    formData.append('originalPrice', data.originalPrice)
    formData.append('discountedPrice', data.discountedPrice)
    formData.append('discountPercentage', data.discountPercentage)

    data.images.forEach((file: any, index: string) => {
      formData.append('image', file)
    })

    formData.append('video', data.video)

    {
      productId
        ? dispatch(
            updateProductAction({
              productBody: formData,
              productId: productId as any,
              onSuccess: () => {
                dispatch(
                  getProductListAction({
                    onSuccess: (data) => console.log('get hit after update')
                  })
                )
                navigate('/products')
                toast.success('Product Created SuccessFully')
              }
            })
          )
        : dispatch(
            createProductAction({
              productBody: formData,
              onSuccess: () => {
                dispatch(
                  getProductListAction({
                    onSuccess: (data) => console.log('get hit')
                  })
                )
                navigate('/products')
                toast.success('Product Created SuccessFully')
              }
            })
          )
    }
  }

  // console.log(
  //   selectedSubCategory,
  //   selectedCategory,
  //   'selected sub category value'
  // )

  return (
    <div className="addProductContainer">
      <div className="addProduct">
        <div className="addProduct-input">
          <Label required labelName="Product Name"></Label>
          <InputField
            type="text"
            placeholder="Enter Product Name"
            onChange={(e: any) =>
              setData((prev: any) => ({...prev, name: e.target.value}))
            }
            value={data.name}
          ></InputField>
        </div>

        <HStack gap="$3">
          <div className="addProduct-input">
            <Label required labelName="Category"></Label>
            <SelectField
              options={category}
              // defaultValue={selectedCategory[0]}
              // value={newUnitList?.find((item) => {
              //   return item.label === data.unitName
              // })}
              // onChangeValue={(e) =>()
              // !Array.isArray(e) && setValue('unitName', e.label)
              // }
              width="320px"
              value={selectedCategory?.label !== undefined && selectedCategory}
              onChangeValue={(data) => {
                setSelectedCategory(data)
                setSelectedSubCategory(null)
              }}
              placeholder={'Select Category'}
            />
          </div>

          <div className="addProduct-input">
            <Label required labelName="SubCategory"></Label>
            <SelectField
              options={subCategory}
              // onChangeValue={(e) =>
              // !Array.isArray(e) && setValue('unitName', e.label)
              // }
              width="320px"
              onChangeValue={(data) => setSelectedSubCategory(data)}
              placeholder={'Select SubCategory'}
              value={
                selectedSubCategory?.label !== undefined && selectedSubCategory
              }
            />
          </div>
        </HStack>

        <HStack justify="space-between" gap="$3">
          <div className="addProduct-input">
            <Label required labelName="Original Price"></Label>
            <InputField
              type="number"
              placeholder="Enter Original Price"
              onChange={(e: any) =>
                setData((prev: any) => ({
                  ...prev,
                  originalPrice: e.target.value
                }))
              }
              value={data.originalPrice}
            ></InputField>
          </div>
          <div className="addProduct-input">
            <Label required labelName="Discount Percentage"></Label>
            <InputField
              type="number"
              placeholder="Enter Discount Percentage"
              onChange={(e: any) =>
                setData((prev: any) => ({
                  ...prev,
                  discountPercentage: e.target.value
                }))
              }
              value={data.discountPercentage}
            ></InputField>
          </div>
        </HStack>

        <div className="addProduct-input">
          <Label required labelName="Discounted Price"></Label>
          <InputField
            type="number"
            placeholder="Enter Discounted Price"
            onChange={(e: any) =>
              setData((prev: any) => ({
                ...prev,
                discountedPrice: e.target.value
              }))
            }
            value={data.discountedPrice}
          ></InputField>
        </div>
        <div className="addProduct-input">
          <Label required labelName="Product Detail"></Label>
          <InputField
            type="text"
            placeholder="Enter Product Detail"
            onChange={(e: any) =>
              setData((prev: any) => ({...prev, details: e.target.value}))
            }
            value={data.details}
          ></InputField>
        </div>

        <div className="addProduct-input">
          <Label required labelName="Product Images"></Label>
          {/* <InputField
            type="file"
            accept="image/*"
            multiple
            placeholder="Upload Your Product Images From Here"
            onChange={handleImage}
            // value={data.images}
          ></InputField> */}

          <ImageUploader
            defaultImage={!!productDetailData ? productDetailData.image : ''}
            onImageChange={handleImage}
            value={data.images}
            actionHandler={handleAction}
          ></ImageUploader>
        </div>

        <div className="addProduct-input">
          <Label required labelName="Product Video"></Label>
          {/* <InputField
            type="file"
            placeholder="Upload Your Product Video From Here"
            accept="video/*"
            onChange={handleVideo}
            // value={data.video}
          ></InputField> */}

          <VideoUploader
            onVideoChange={handleVideo}
            value={handleVideo}
          ></VideoUploader>
        </div>

        <Button
          title={productId ? 'Update Product' : 'Add Product'}
          onClick={addProductHandler}
          loading={productId ? updateProductLoading : createProductLoading}
        ></Button>
      </div>
    </div>
  )
}
