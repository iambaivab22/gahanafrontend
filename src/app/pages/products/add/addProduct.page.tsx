import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'src/store'

import {useParams} from 'src/hooks'
import {Button, InputField, Label, SelectField} from 'src/app/common'
import {
  getCategoryListAction,
  getSubCategoryAction
} from '../../category/category.slice'
import {
  createProductAction,
  getProductDetailByIdAction,
  getProductListAction
} from '../product.slice'
import {useFormInput} from 'use-form-input'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'

export const AddProductPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productId = useParams('productId')

  console.log('product id is available', productId)
  const [data, setData] = useState({
    name: '',
    originalPrice: '',
    discountedPrice: '',
    discountPercentage: '',
    category: '',
    subCategory: '',
    images: [],
    video: null,
    details: ''
  })

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

  const {createProductLoading}: any = useSelector((state: any) => state.product)

  useEffect(() => {
    dispatch(
      getCategoryListAction({
        onSuccess: () => console.log('categoryList fetch Successfully')
      })
    )
  }, [])

  useEffect(() => {
    const mappedCategory = categoryData?.map((item: any, index: number) => {
      console.log(item, 'caetgory item')
      return {
        id: item.id,
        label: item.name,
        value: item.name,
        subCategory: item.subCategories
      }
    })
    console.log(mappedCategory, 'mapped category')
    setCategory(mappedCategory)
  }, [categoryData])

  useEffect(() => {
    console.log('selcted category changed')
    setSelectedSubCategory(null)

    console.log(selectedSubCategory, 'selectedSubVateory')
    const mappedSubCategory = selectedCategory?.subCategory.map(
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
  console.log(
    selectedCategory,
    selectedSubCategory,
    'selected category and selected  subcategory'
  )

  const handleImage = (event: any) => {
    const selectedFiles = Array.from(event.target.files)
    setData((prev) => ({...prev, images: selectedFiles}))
  }

  const handleVideo = (event: any) => {
    setData((prev) => ({...prev, video: event.target.files[0]}))
  }

  const addProductHandler = (event: any) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('category', selectedCategory.id)
    formData.append('subCategory', selectedSubCategory.id)
    formData.append('originalPrice', data.originalPrice)
    formData.append('discountedPrice', data.discountedPrice)
    formData.append('discountPercentage', data.discountPercentage)

    data.images.forEach((file, index) => {
      formData.append('image', file)
    })

    formData.append('video', data.video)

    dispatch(
      createProductAction({
        productBody: formData,
        onSuccess: () => {
          dispatch(
            getProductListAction({onSuccess: (data) => console.log('get hit')})
          )
          navigate('/products')
          toast.success('Product Created SuccessFully')
        }
      })
    )
  }

  return (
    <div className="">
      <div className="">
        <Label required labelName="Name"></Label>
        <InputField
          type="text"
          placeholder="Enter Product Name"
          onChange={(e: any) =>
            setData((prev: any) => ({...prev, name: e.target.value}))
          }
        ></InputField>
      </div>
      <div>
        <Label required labelName="Category"></Label>
        <SelectField
          options={category}
          // value={newUnitList?.find((item) => {
          //   return item.label === data.unitName
          // })}
          // onChangeValue={(e) =>()
          // !Array.isArray(e) && setValue('unitName', e.label)
          // }
          width="320px"
          onChangeValue={(data) => setSelectedCategory(data)}
          placeholder={'Select Category'}
        />
      </div>

      <div>
        <Label required labelName="SubCategory"></Label>
        <SelectField
          options={subCategory}
          value={selectedSubCategory}
          // onChangeValue={(e) =>
          // !Array.isArray(e) && setValue('unitName', e.label)
          // }
          width="320px"
          onChangeValue={(data) => setSelectedSubCategory(data)}
          placeholder={'Select SubCategory'}
        />
      </div>

      <Label required labelName="Original Price"></Label>
      <InputField
        type="number"
        placeholder="Enter Original Price"
        onChange={(e: any) =>
          setData((prev: any) => ({...prev, originalPrice: e.target.value}))
        }
      ></InputField>

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
      ></InputField>

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
      ></InputField>

      <Label required labelName="Product Detail"></Label>
      <InputField
        type="text"
        placeholder="Enter Product Detail"
        onChange={(e: any) =>
          setData((prev: any) => ({...prev, details: e.target.value}))
        }
      ></InputField>

      <Label required labelName="Product Images"></Label>
      <InputField
        type="file"
        accept="image/*"
        multiple
        placeholder="Upload Your Product Images From Here"
        onChange={handleImage}
      ></InputField>

      <Label required labelName="Product Video"></Label>
      <InputField
        type="file"
        placeholder="Upload Your Product Video From Here"
        accept="video/*"
        onChange={handleVideo}
      ></InputField>

      <Button
        title={productId ? 'Update Product' : 'Add Product'}
        onClick={addProductHandler}
        loading={createProductLoading}
      ></Button>
    </div>
  )
}
