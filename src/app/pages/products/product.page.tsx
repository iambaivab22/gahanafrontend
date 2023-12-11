import React, {useEffect, useState, useCallback} from 'react'
import {useDispatch} from 'src/store'
import {delteProductAction, getProductListAction} from './product.slice'
import {useSelector} from 'react-redux'
import {
  Box,
  Button,
  HStack,
  SearchField,
  SelectField,
  Table
} from 'src/app/common'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import {getCategoryListAction} from '../category/category.slice'
import {useDebounceValue} from 'src/hooks'
export const ProductListPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchTxt, setSearchTxt] = useState('')

  const {data}: any = useSelector((state: any) => state.product)
  const [category, setCategory] = useState<any>([])
  const [selectedCateory, setSelectedCategory] = useState<any>('')
  const {categoryData}: any = useSelector((state: any) => state.category)

  useEffect(() => {
    dispatch(
      getCategoryListAction({
        onSuccess: () => console.log('categoryList fetch Successfully')
      })
    )
  }, [])

  useEffect(() => {
    const mappedCategory = categoryData?.map((item: any, index: number) => {
      return {
        id: item.id,
        label: item.name,
        value: item.name,
        subCategory: item.subCategories
      }
    })

    // const allCategory = [
    //   {},
    //   mappedCategory
    // ]

    // console.log(mappedCategory, 'mapped category from products')
    mappedCategory?.unshift({
      id: '',
      label: 'All',
      value: '',
      subCategory: ''
    })

    setCategory(mappedCategory)
  }, [categoryData])

  useEffect(() => {
    dispatch(
      getProductListAction({
        onSuccess: () => {}
      })
    )
  }, [])

  const handleSearch = (e: any) => {
    // console.log(e.target.value, 'searchValue')
    setSearchTxt(e.target.value)

    // const debounceValue = useDebounceValue(e.target.value)
  }

  useEffect(() => {
    dispatch(
      getProductListAction({
        onSuccess: () => {},
        query: {search: searchTxt, categoryId: selectedCateory?.id}
      })
    )
  }, [searchTxt, selectedCateory])

  return (
    <div>
      <Box>
        <HStack justify="space-between" gap={'$4'} style={{margin: '20px 0'}}>
          <Button title="Add Product" onClick={() => navigate('add')}></Button>
          <SearchField
            placeholder="Search Your Product"
            onChange={handleSearch}
          ></SearchField>
          <SelectField
            // defaultValue={category?.[0]}
            options={category}
            value={selectedCateory}
            width="320px"
            onChangeValue={(data) => setSelectedCategory(data)}
            placeholder={'Filter Product By Category'}
          />
        </HStack>

        <Table
          columns={[
            {
              field: 'name',
              name: 'Name',
              render: (datas) => {
                return <div>{datas}</div>
              }
            },
            {
              field: 'discountedPrice',
              name: 'Price',
              render: (datas) => <div>{datas}</div>
            },
            {
              field: 'originalPrice',
              name: 'Original Price',
              render: (datas) => <div>{datas}</div>
            },
            // {
            //   field: 'discountPercentage',
            //   name: 'Discounted Price',
            //   render: (datas) => <div>{datas}</div>
            // },
            {
              field: 'image',
              name: 'Images',
              render: (datas) => (
                <div>
                  {
                    <img
                      src={datas[0]?.url}
                      style={{height: '70px', width: '100px'}}
                    ></img>
                  }
                </div>
              )
            }
          ]}
          data={data}
          actions={{
            onView: (item: any) => {
              navigate(`view/${item.id}`)
            },

            onEdit: (item: any) => {
              navigate(`update/${item.id}`)
            },
            onDelete: (item: any, onCloseModalHandler) => {
              dispatch(
                delteProductAction({
                  productId: item.id,
                  onSuccess: (data: any) => {
                    onCloseModalHandler()

                    console.log('onSUccess called')
                    toast.success('Product deleted successfully')
                    console.log('ad1')
                    dispatch(
                      getProductListAction({
                        onSuccess: () => {},
                        query: {
                          search: searchTxt,
                          categoryId: selectedCateory?.id
                        }
                      })
                    )
                  }
                })
              )
            }
          }}
          pagination={{
            totalCount: Number(data?.length ?? 1),
            perPage: Number(5)
          }}
        />
      </Box>
    </div>
  )
}
