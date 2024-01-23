import React, {useCallback, useEffect, useState} from 'react'
import {Button, InputField, Label, VStack} from 'src/app/common'
import {useParams} from 'src/hooks'
import {useDispatch, useSelector} from 'src/store'
import {
  updateTestimonialAction,
  createTestimonialAction,
  getTestimonialDetailByIdAction
} from '../testimonial.slice'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

export const AddSubCategoryPage = () => {
  const {
    updateTestimonialLoading,
    createTestimonialLoading,
    testimonialDetailLoading,
    testimonialDetailData
  } = useSelector((state: any) => state.subCategory)
  const navigate = useNavigate()

  const testimonialId = useParams('testimonialId')
  const [data, setData] = useState<any>({
    name: ''
  })
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(testimonialId, 'subCategorydI')
    dispatch(
      getTestimonialDetailByIdAction({testimonialId: testimonialId as string})
    )
  }, [testimonialId])

  useEffect(() => {
    console.log(testimonialDetailData, 'subCategoryDetailData')
    setData((prev: any) => ({
      ...prev,
      name: testimonialDetailData?.description
    }))
  }, [testimonialDetailData])

  const addTestimonialHandler = () => {




    
    !testimonialId
      ? dispatch(
          createTestimonialAction({
            testimonialBody: {name: data.name},
            onSuccess: (data: any) => {
              navigate('/subCategory')
              toast.success('Sub Category Created')
            }
          })
        )
      : dispatch(
          updateTestimonialAction({
            testimonialBody: {name: data.name},
            testimonialId: testimonialId as string,
            onSuccess: (data: any) => {
              toast.success('testimonial Updated Successfully')
              navigate('/testimonial')
            }
          })
        )
  }

  return (
    <VStack gap="$3">
      <VStack gap="$2">
        <Label required labelName="Sub Category Name"></Label>

        <InputField
          type="text"
          placeholder="Enter Testimonial Description"
          onChange={(e: any) =>
            setData((prev: any) => ({
              ...prev,
              name: e.target.value
            }))
          }
          value={data.name}
        ></InputField>
      </VStack>

      <Button
        title={testimonialId ? 'Update Testimonial' : 'Add Testimonial'}
        onClick={addTestimonialHandler}
        loading={
          testimonialId ? updateTestimonialLoading : createTestimonialLoading
        }
      ></Button>
    </VStack>
  )
}
