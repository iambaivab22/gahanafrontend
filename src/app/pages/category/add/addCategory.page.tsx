import React, {useState, useEffect, useCallback} from 'react'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {
  Button,
  HStack,
  InputField,
  Label,
  SelectField,
  VStack
} from 'src/app/common'
import {useParams} from 'src/hooks'
import {useDispatch, useSelector} from 'src/store'
import {
  createSubCategoryAction,
  getSubCategoryListAction
} from '../../subCategory/subCategory.slice'
import {
  createCategoryAction,
  getCategoryDetailByIdAction,
  getSubCategoryAction
} from '../category.slice'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

export const AddCategoryPage = () => {
  const categoryId = useParams('categoryId')
  const navigate = useNavigate()
  const [data, setData] = useState<any>({
    name: '',
    subCategories: []
  })
  const dispatch = useDispatch()
  const [subCategories, setSubCategories] = useState([])
  const [eachSubCat, setEachSubCat] = useState('')
  const [subCategoryOption, setSubCategoryOption] = useState()
  const [selectedSubCategoryOption, setSelectedSubCategoryOption] = useState([])
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState([])

  const {
    categoryData,
    getCategoryLoading,
    createCategoryLoading,
    updateCategoryLoading,
    getSubCategoryLoading,
    subCategoryData,
    categoryDetailData
  }: any = useSelector((state: any) => state.category)

  useEffect(() => {
    console.log(eachSubCat, 'eachSubCat')
  }, [eachSubCat])

  useEffect(() => {
    console.log(subCategories, 'subCatgories')
  }, [subCategories])

  const handleInputChange = (e: any) => {
    setEachSubCat(e.target.value)
    // console.log(e.target, 'e.key hai')
  }

  const deleteSubCategory = (id: number) => {
    const remainingSubCategory = subCategories.filter(
      (item: string, index: number) => {
        return index !== id
      }
    )
    setSubCategories(remainingSubCategory)
  }

  const addCategoryHandler = () => {
    dispatch(
      createCategoryAction({
        categoryBody: {
          name: data.name,
          subCategories: selectedSubCategoryId
        },
        onSuccess: () => {
          toast.success('subCategory Updated Successfully')
          navigate('/category')
        }
      })
    )
  }

  // const handleKeyDown = (e: any) => {
  //   // console.log('key down is called')
  //   if (e.key === 'Enter') {
  //     console.log('enter called')
  //     setSubCategories((prev: string[]) => [...prev, e.target.value])
  //     setEachSubCat('')
  //   }
  // }

  useEffect(() => {
    dispatch(getSubCategoryAction({}))
    categoryId &&
      dispatch(getCategoryDetailByIdAction({categoryId: categoryId as string}))
  }, [])

  const remappedSubCategoryAction = useCallback(() => {
    // console.log(subCategoryData, 'subCategoryData inside function')

    const modifiedSubCategoryList = subCategoryData?.map(
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
  }, [subCategoryData])

  useEffect(() => {
    remappedSubCategoryAction()

    categoryId &&
      setData((prev: any) => ({...prev, name: categoryDetailData?.name}))
    const remappedCategoryDetail = categoryDetailData?.subCategories?.map(
      (item: any, index: number) => {
        return {
          id: item.id,
          label: item.name,
          value: item.name
        }
      }
    )

    console.log(remappedCategoryDetail, 'remappedcategory detail')

    categoryId && setSelectedSubCategoryOption(remappedCategoryDetail)

    // console.log(subCategories, 'subCategorydata from useEffect')
  }, [subCategoryData, categoryDetailData])

  useEffect(() => {
    console.log(subCategoryOption, 'subCategory option')
  }, [subCategoryOption])

  useEffect(() => {
    console.clear()
    console.log(
      selectedSubCategoryOption,
      'selectedSub Category Option changed'
    )
    const selectedSubCategoryId = selectedSubCategoryOption?.map(
      (item: any) => {
        return item.id
      }
    )

    setSelectedSubCategoryId(selectedSubCategoryId)
  }, [selectedSubCategoryOption])
  return (
    <div className="addCategoryContainer">
      <VStack className="addCategory" gap="$3">
        <VStack gap="$2">
          <Label required labelName="Category Name"></Label>

          <InputField
            type="text"
            placeholder="Enter Category Name"
            onChange={(e: any) =>
              setData((prev: any) => ({
                ...prev,
                name: e.target.value
              }))
            }
            value={data.name}
          ></InputField>
        </VStack>

        <VStack className="addCategory-subCategory" gap="$4">
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

            {/* <InputField
              placeholder='Type subcategory and press "ENTER" to save'
              type="text"
              value={eachSubCat}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            ></InputField> */}
          </VStack>

          {/* <div className="addCategory-subCategory-list">
            {subCategories.map((item: string, index: number) => {
              return (
                <HStack
                  className="addCategory-subCategory-list-item"
                  justify="space-between"
                  gap="$1"
                >
                  <p>{item}</p>
                  <AiOutlineCloseCircle
                    onClick={(e: any) => deleteSubCategory(index)}
                    color="white"
                    size={20}
                  ></AiOutlineCloseCircle>
                </HStack>
              )
            })}
          </div> */}
        </VStack>

        <Button
          title={categoryId ? 'Update Category' : 'Add Category'}
          onClick={addCategoryHandler}
          loading={categoryId ? updateCategoryLoading : createCategoryLoading}
        ></Button>
      </VStack>
    </div>
  )
}
