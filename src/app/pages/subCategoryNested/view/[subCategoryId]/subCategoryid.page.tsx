import React, {useState} from 'react'
import {Button, InputField, Label, VStack} from 'src/app/common'
import {useParams} from 'src/hooks'
import {useDispatch, useSelector} from 'src/store'
import {updateSubCategoryActionNested} from '../../subCategory.slice'
import toast from 'react-hot-toast'

const SubCategoryDetailPageNested = () => {
  const {updateSubCategoryLoadingNested}: any = useSelector(
    (state: any) => state.subCategoryNested
  )
  const subCategoryId = useParams('subCategoryId')
  const [data, setData] = useState<any>({
    name: ''
  })
  const dispatch = useDispatch()

  const addSubCategoryHandler = () => {
    dispatch(
      updateSubCategoryActionNested({
        subCategoryBody: {name: data.name},
        subCategoryId: subCategoryId as string,
        onSuccess: (data: any) => {
          toast.success('product delete')
        }
      })
    )
  }

  return (
    <VStack>
      <VStack gap="$2">
        <Label required labelName="Category Name"></Label>

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
        title={subCategoryId ? 'Update Category' : 'Add Category'}
        onClick={addSubCategoryHandler}
        loading={updateSubCategoryLoadingNested}
      ></Button>
    </VStack>
  )
}

export default SubCategoryDetailPageNested
