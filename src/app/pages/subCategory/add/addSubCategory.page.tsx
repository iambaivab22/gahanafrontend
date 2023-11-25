import React, {useCallback, useEffect, useState} from 'react'
import {Button, InputField, Label, VStack} from 'src/app/common'
import {useParams} from 'src/hooks'
import {useDispatch, useSelector} from 'src/store'
import {
  updateSubCategoryAction,
  createSubCategoryAction,
  getSubCategoryDetailByIdAction
} from '../subCategory.slice'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

export const AddSubCategoryPage = () => {
  const {
    updateSubCategoryLoading,
    createSubCategoryLoading,
    subCategoryDetailLoading,
    subCategoryDetailData
  }: any = useSelector((state: any) => state.subCategory)
  const navigate = useNavigate()

  const subCategoryId = useParams('subCategoryId')
  const [data, setData] = useState<any>({
    name: ''
  })
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(subCategoryId, 'subCategorydI')
    dispatch(
      getSubCategoryDetailByIdAction({subCategoryId: subCategoryId as string})
    )
  }, [subCategoryId])

  useEffect(() => {
    console.log(subCategoryDetailData, 'subCategoryDetailData')
    setData((prev: any) => ({...prev, name: subCategoryDetailData?.name}))
  }, [subCategoryDetailData])

  const addSubCategoryHandler = () => {
    !subCategoryId
      ? dispatch(
          createSubCategoryAction({
            subCategoryBody: {name: data.name},
            onSuccess: (data: any) => {
              navigate('/subCategory')
              toast.success('Sub Category Created')
            }
          })
        )
      : dispatch(
          updateSubCategoryAction({
            subCategoryBody: {name: data.name},
            subCategoryId: subCategoryId as string,
            onSuccess: (data: any) => {
              toast.success('subCategory Updated Successfully')
              navigate('/subCategory')
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
          placeholder="Enter SubCategory Name"
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
        title={subCategoryId ? 'Update SubCategory' : 'Add SubCategory'}
        onClick={addSubCategoryHandler}
        loading={
          subCategoryId ? updateSubCategoryLoading : createSubCategoryLoading
        }
      ></Button>
    </VStack>
  )
}
