import React, {useState, useEffect} from 'react'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {Button, HStack, InputField, Label, VStack} from 'src/app/common'
import {useParams} from 'src/hooks'
import {useSelector} from 'src/store'

export const AddCategoryPage = () => {
  const categoryId = useParams('categoryId')
  const [data, setData] = useState<any>({
    name: '',
    subCategories: []
  })

  const [subCategories, setSubCategories] = useState([])
  const [eachSubCat, setEachSubCat] = useState('')

  const {
    categoryData,
    getCategoryLoading,
    createCategoryLoading,
    updateCategoryLoading,
    getSubCategoryLoading
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

  const addCategoryHandler = () => {}

  const handleKeyDown = (e: any) => {
    // console.log('key down is called')
    if (e.key === 'Enter') {
      console.log('enter called')

      setSubCategories((prev: string[]) => [...prev, e.target.value])
      setEachSubCat('')
    }
  }

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
            <InputField
              placeholder='Type subcategory and press "ENTER" to save'
              type="text"
              value={eachSubCat}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            ></InputField>
          </VStack>

          <div className="addCategory-subCategory-list">
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
          </div>
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
