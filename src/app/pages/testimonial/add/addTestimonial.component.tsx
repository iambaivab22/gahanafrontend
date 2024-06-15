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
import ImageUploader from 'src/app/common/imageUploader/imageUploader.common'

export const AddTestimonialPage = () => {
  const {
    updateTestimonialLoading,
    createTestimonialLoading,
    testimonialDetailLoading,

    // testimoniailDetailData
    testimonialDetailData
  } = useSelector((state: any) => state.testimonial)
  const navigate = useNavigate()

  const testimonialId = useParams('testimonialId')
  const [data, setData] = useState<any>({
    description: '',
    image: []
  })
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(testimonialId, 'tid')
    dispatch(getTestimonialDetailByIdAction({testimonialId: testimonialId}))
  }, [testimonialId])

  useEffect(() => {
    // console.log(testimonialDetailData, 'dd')
    setData((prev: any) => ({
      image: testimonialDetailData?.testimonialImage,
      description: testimonialDetailData?.testimonialDescription
    }))

    console.log(testimonialDetailData, 'testimonial detail data')
  }, [testimonialDetailData])

  const addTestimonialHandler = () => {
    const formData = new FormData()

    data?.image?.forEach((file: any, index: string) => {
      formData.append('testimonialImage', file)
    })

    formData.append('testimonialDescription', data.description)

    !testimonialId
      ? dispatch(
          createTestimonialAction({
            testimonialBody: formData,
            onSuccess: (data: any) => {
              navigate('/testimonial')
              toast.success('Testimonial Created')
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
        <div>
          <Label required labelName="Testimonial Name"></Label>

          <InputField
            type="text"
            placeholder="Enter Testimonial Description"
            onChange={(e: any) =>
              setData((prev: any) => ({
                ...prev,
                description: e.target.value
              }))
            }
            value={data.description}
          ></InputField>
        </div>

        <VStack>
          <Label required labelName="Testimonial Name"></Label>

          <ImageUploader
            defaultImage={data.image}
            onImageChange={(e: any) => {
              const selectedFiles = Array.from(e.target.files)
              console.log(selectedFiles, 'seelctedFiles+++++++++++++')

              setData((prev: any) => ({...prev, image: selectedFiles}))
            }}
            // value={bannerImage}
            uniqueKeys="testimonialImages"
            actionHandler={(name: any) => {
              // dispatch(
              //   deleteBannerImageAction({
              //     bannerName: name,
              //     onSuccess: (data: any) =>
              //       toast.success('banner image deleted successfully')
              //   })
              // )
            }}
            isBanner={true}
          ></ImageUploader>
        </VStack>
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
