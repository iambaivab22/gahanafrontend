import React, {useCallback, useEffect, useState} from 'react'
import {Button, InputField, Label, SelectField, VStack} from 'src/app/common'
import {useParams} from 'src/hooks'
import {useDispatch, useSelector} from 'src/store'
import {
  updateSubCategoryAction,
  createSubCategoryAction,
  getSubCategoryDetailByIdAction
} from '../subCategory.slice'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import {
  getSubCategoryDetailByIdActionNested,
  getSubCategoryListActionNested
} from '../../subCategoryNested/subCategory.slice'

export const AddSubCategoryPage = () => {
  const {
    updateSubCategoryLoading,
    createSubCategoryLoading,
    subCategoryDetailLoading,

    subCategoryDetailData
  }: any = useSelector((state: any) => state.subCategory)

  const {subCategoryDataNested, subCategoryDetailDataNested} = useSelector(
    (state: any) => state.subCategoryNested
  )

  const {subCategoryDataNeseted} = useSelector(
    (state: any) => state.subCategoryNested
  )
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

  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState([])

  // const categoryId = useParams('subCategoryId')
  // console.log(
  //   selectedSubCategoryId,
  //   selectedSubCategoryOption,
  //   'subCategoryId value data outside'
  // )

  const [selectedSubCategoryOption, setSelectedSubCategoryOption] = useState([])

  console.log(selectedSubCategoryOption, 'selected sub category option')
  const addSubCategoryHandler = () => {
    console.log(
      selectedSubCategoryId,
      selectedSubCategoryOption,
      'subCategoryId value data'
    )
    !subCategoryId
      ? dispatch(
          createSubCategoryAction({
            subCategoryBody: {
              name: data.name,
              subCategories: [selectedSubCategoryOption[0]?.id]
            },
            onSuccess: (data: any) => {
              navigate('/dash-subCategory')
              toast.success('Sub Category Created')
            }
          })
        )
      : dispatch(
          updateSubCategoryAction({
            subCategoryBody: {
              name: data.name,
              subCategories: selectedSubCategoryId
            },
            subCategoryId: subCategoryId as string,
            onSuccess: (data: any) => {
              toast.success('subCategory Updated Successfully')
              navigate('/dash-subCategory')
            }
          })
        )
  }

  const [subCategoryOption, setSubCategoryOption] = useState()

  console.log(selectedSubCategoryOption, 'option value data')
  console.log(
    subCategoryDataNested,
    'subCategoryData inside function value data'
  )
  const remappedSubCategoryAction = useCallback(() => {
    const modifiedSubCategoryList = subCategoryDataNested?.map(
      (item: any, index: number) => {
        return {
          id: item.id,
          label: item.name,
          value: item.name
        }
      }
    )
    console.log(modifiedSubCategoryList, 'modified Sub Category List')

    setSubCategoryOption(modifiedSubCategoryList)
  }, [subCategoryDataNested])

  useEffect(() => {
    remappedSubCategoryAction()

    subCategoryId &&
      setData((prev: any) => ({...prev, name: subCategoryDetailData?.name}))
    const remappedCategoryDetail = selectedSubCategoryOption.map(
      (item: any, index: number) => {
        return {
          id: item.id,
          label: item.name,
          value: item.name
        }
      }
    )

    console.log(
      subCategoryDetailDataNested,
      remappedCategoryDetail,
      'remappedcategory detail'
    )

    // subCategoryId && setSelectedSubCategoryOption(remappedCategoryDetail)

    // console.log(subCategories, 'subCategorydata from useEffect')
  }, [subCategoryDataNeseted, subCategoryDetailData])

  useEffect(() => {
    console.log(subCategoryDataNested, 'final data hai')
    dispatch(getSubCategoryListActionNested({}))
    subCategoryId &&
      dispatch(
        getSubCategoryDetailByIdActionNested({
          subCategoryId: subCategoryId as string
        })
      )
  }, [])

  console.log(data, 'data value data')

  useEffect(() => {
    console.log(
      subCategoryOption,
      data?.subCategories,
      'subCategoryOption value data'
    )

    if (!!subCategoryId) {
      if (!!subCategoryOption) {
        const selectedSubCategoryId = subCategoryOption?.find((item: any) => {
          return item.id === data?.subCategories?.[0]
        }) || {
          id: '',
          label: '',
          value: ''
        }

        console.log(
          selectedSubCategoryOption,
          'selectedSub Category Option changed'
        )
      }
    }

    setSelectedSubCategoryId(selectedSubCategoryId)
  }, [subCategoryOption, data, subCategoryId])

  useEffect(() => {
    dispatch(getSubCategoryListActionNested({}))
    subCategoryId &&
      dispatch(
        getSubCategoryDetailByIdActionNested({
          subCategoryId: subCategoryId as string
        })
      )
  }, [])

  console.log(subCategoryDataNested, 'subCategoryDataNested data value y ')
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

      <VStack gap="$2">
        <Label required labelName="SubCategories"></Label>
        <SelectField
          options={subCategoryOption && subCategoryOption}
          // getOptionLabel="org_sector"
          // getOptionValue="id"
          value={selectedSubCategoryOption}
          isSearchable={true}
          isMulti={true}
          // width="225px"
          onChangeValue={(data) => {
            setSelectedSubCategoryOption(data)

            // setSelectedSubCategoryOption(selectedSubCategory)
          }}
          placeholder="Select SubCategory"
        ></SelectField>
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
