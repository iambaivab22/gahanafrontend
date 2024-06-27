import React, {useEffect, useState, useCallback} from 'react'
import {useDispatch} from 'src/store'
// import {delteProductAction, getProductListAction} from './product.slice'
import {useSelector} from 'react-redux'
import {Box, Button, HStack, SelectField, Table} from 'src/app/common'
import {useNavigate} from 'react-router-dom'
// import {toast} from 'react-hot-toast'

import {getOrderListAction} from '../web/cart/cart.slice'
import {getNprPrice} from 'src/helpers/nprPrice.helper'
export const OrderListPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [orderList, setOrderLists] = useState<any>()
  const [selectedCateory, setSelectedCategory] = useState<any>()
  const orderData = useSelector((state: any) => state.cart)

  useEffect(() => {
    dispatch(
      getOrderListAction({
        onSuccess: () => console.log('Order list fetched Successfully')
      })
    )
  }, [])

  useEffect(() => {
    console.log(orderData, 'orderdata')
  }, [orderData])

  return (
    <div>
      <Box>
        <HStack justify="space-between" style={{margin: '20px 0'}}>
          <Button
            title="Add Order list"
            onClick={() => navigate('add')}
          ></Button>
        </HStack>

        <Table
          columns={[
            {
              field: 'products',
              name: 'Name',
              render: (datas) => {
                console.log(datas, 'datasssssssssss')
                return <div>{datas?.[0]?.productId?.name}</div>
              }
            },

            {
              field: 'userId',
              name: 'Customer Name',
              render: (datas) => {
                console.log(datas, 'datasssssssssss')
                return <div>{datas?.email}</div>
              }
            },

            {
              field: 'products',
              name: 'Quantity',
              render: (datas) => {
                console.log(datas, 'datasssssssssss')
                return <div>{datas?.[0]?.quantity}</div>
              }
            },
            {
              field: 'products',
              name: 'Price',
              render: (datas) => {
                console.log(datas, 'datasssssssssss')
                return <div>{getNprPrice(datas?.[0]?.price)}</div>
              }
            },
            {
              field: 'isInsideValley',
              name: 'Is Inside Valley?',
              render: (datas) => {
                console.log(datas, '')
                return <div>{datas === true ? 'yes' : 'no'}</div>
              }
            },
            {
              field: 'shippingLocation',
              name: 'Shipping Location',
              render: (datas) => {
                console.log(datas, '')
                return <div>{datas}</div>
              }
            }

            // {
            //   field: 'subCategories',
            //   name: 'SubCategory',
            //   render: (datas) => (
            //     <div className="subCategoryButton">
            //       {datas?.map((item: any, index: number) => {
            //         return <p className="subCategoryButton-item">{item.name}</p>
            //       })}
            //     </div>
            //   )
            // }
          ]}
          data={(orderData && orderData.orderData) ?? []}
          actions={
            {
              // onView: (item: any) => {
              //   navigate(`view/${item.id}`)
              // },
              // onEdit: (item: any) => {
              //   console.log(item.id, 'item id to delete')
              //   navigate(`update/${item._id}`)
              // },
              // onDelete: (item: any, onCloseModalHandler) => {
              //   dispatch(
              //     deleteShopByBudgetAction({
              //       shopByBudgetId: item._id,
              //       onSuccess: (data: any) => {
              //         onCloseModalHandler()
              //         toast.success('ShopByBudget deleted successfully')
              //         dispatch(
              //           getShopByBudgetListAction({
              //             onSuccess: () => {}
              //           })
              //         )
              //       }
              //     })
              //   )
              // }
            }
          }
          pagination={{
            totalCount: Number(orderData.orderData?.length ?? 1)
            // perPage: Number(import.meta.REACT_APP_TABLE_LIMIT || 10)
          }}
        />
      </Box>
    </div>
  )
}
