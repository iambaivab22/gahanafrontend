import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'src/store'
// import {getCartByUserIdListAction} from './cart.slice'
import {getCookie} from 'src/helpers'
import {CartCard} from 'src/app/components'
import {createOrderByUserIdAction, getCartlistAction} from './cart.slice'
import {HStack, InputField, SelectField, VStack} from 'src/app/common'
import {getNprPrice} from 'src/helpers/nprPrice.helper'
import toast from 'react-hot-toast'
export const CartPage = () => {
  const dispatch = useDispatch()
  const datas = useSelector((state: any) => state.cart)
  const [upatedcartData, setUpdatedCartData] = useState(
    datas?.cartData?.[0]?.products ?? []
  )

  const [isInsideValley, setIsInsideValley] = useState<boolean>(true)

  const [cartProductList, setCartProductList] = useState<any>([])
  const [shoppingCost, setShoppingCost] = useState(10)
  const [shippingLocation, setShippingLocation] = useState('')
  useEffect(() => {
    const userId = getCookie('userId')
    userId && dispatch(getCartlistAction({userId: userId}))
  }, [])

  console.log(datas, 'data')

  useEffect(() => {
    setUpdatedCartData(datas?.cartData?.[0]?.products)
  }, [datas?.cartData?.[0]?.products])

  const changeQuantity = (countQuantity, data) => {
    // console.log(e.target.value, 'e.target value')
    const updatedCart = upatedcartData?.map((item: any, index: number) => {
      if (item._id !== data._id) {
        return item
      } else {
        return {...item, quantity: countQuantity}
      }
    })

    setUpdatedCartData(updatedCart)
  }

  useEffect(() => {
    console.log('updatedCartData', upatedcartData)
    console.log(
      'sum',
      upatedcartData?.map((item, index) => {
        return item.price * item.quantity
      })
    )
  }, [upatedcartData])

  const checkoutHandler = () => {
    const userId = getCookie('userId')
    userId &&
      dispatch(
        createOrderByUserIdAction({
          userId: userId,
          data: {
            userId: userId,
            products: upatedcartData?.map((item, index) => {
              console.log(item.price, item.quantity, 'price and quantity')
              return {
                productId: item.productId.id,
                quantity: item.quantity,
                price: Number(item?.productId?.discountedPrice * item.quantity)
              }
            }),

            isInsideValley: JSON.stringify(isInsideValley),
            orderedAt: Date.now().toLocaleString(),
            shippingLocation: shippingLocation
          },
          onSuccess: () => {
            toast.success('Checkout successfully done')
          }
        })
      )
  }

  return (
    <HStack
      gap="$4"
      align="flex-start"
      justify="space-between"
      className="cartPage"
    >
      <VStack gap="$3" style={{width: '60%'}}>
        {datas?.cartData?.[0]?.products?.length > 0 ? (
          datas?.cartData?.[0]?.products?.map((item: any, index: number) => {
            return (
              <CartCard
                data={item}
                onChangePrice={changeQuantity}
                key={index}
              ></CartCard>
            )
          })
        ) : (
          <img
            className="noProductOnCart"
            src="src/assets/images/noCart.png"
          ></img>
        )}
      </VStack>
      <VStack style={{width: '30%'}} gap="$3">
        <VStack className="cartPage-orderSummary" gap="$5">
          <p className="cartPage-orderSummary-itemCount">
            Total Items:{upatedcartData?.length}
          </p>
          <p className="cartPage-orderSummary-title">Order Summary</p>
          <HStack
            style={{width: '100%'}}
            justify="space-between"
            align="center"
          >
            <p>SubTotal</p>
            <p>
              {getNprPrice(
                upatedcartData
                  ?.map((item, index) => {
                    console.log(item.quantity, 'quantity')
                    return item.price * item.quantity
                  })
                  ?.reduce((acc, curr) => {
                    return acc + curr
                  }, 0)
              )}
            </p>
          </HStack>

          <HStack justify="space-between" align="center">
            <p>Shipping Area</p>

            <SelectField
              options={[
                {
                  id: 1,
                  label: 'Inside Kathmandu Valley',
                  value: 'Inside Kathmandu Valley'
                },
                {
                  id: 2,
                  label: 'Outside Kathmandu Valley',
                  value: 'Outside Kathmandu Valley'
                }
              ]}
              // value={selectedCateory}
              width="100%"
              onChangeValue={(data) => setIsInsideValley((prev) => !prev)}
              placeholder={'Where from'}
            />
          </HStack>
          <HStack justify="space-between" align="center">
            <p>Shipping Location</p>

            <InputField
              onChange={(e) => setShippingLocation(e.target.value)}
              placeholder="Enter full address"
            ></InputField>
          </HStack>
          <HStack
            style={{width: '100%'}}
            justify="space-between"
            align="center"
          >
            <p>Shipping Cost</p>
            <p>10</p>
          </HStack>

          <HStack
            style={{width: '100%', fontWeight: 'bold'}}
            justify="space-between"
            align="center"
          >
            <p>Total</p>
            <p>
              {' '}
              {getNprPrice(
                upatedcartData
                  ?.map((item, index) => {
                    return item.price * item.quantity
                  })
                  ?.reduce((acc, curr) => {
                    return acc + curr
                  }, 0) + shoppingCost
              )}
            </p>
          </HStack>
        </VStack>
        <HStack
          align="center"
          justify="center"
          className="cartPage-checkout"
          onClick={checkoutHandler}
        >
          Checkout
        </HStack>
      </VStack>
    </HStack>
  )
}
