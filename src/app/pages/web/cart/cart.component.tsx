import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'src/store'
// import {getCartByUserIdListAction} from './cart.slice'
import {getCookie} from 'src/helpers'
import {CartCard} from 'src/app/components'
import {
  createCartByUserIdAction,
  createOrderByUserIdAction,
  delteProductFromCartAction,
  getCartlistAction,
  updatedCartByProductIdAction
} from './cart.slice'

import {districtArray} from 'src/utils/districtArray'
import {HStack, InputField, Label, SelectField, VStack} from 'src/app/common'
import {getNprPrice} from 'src/helpers/nprPrice.helper'
import toast from 'react-hot-toast'
import {useMeasure, useMedia} from 'src/hooks'
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
  const media = useMedia()

  useEffect(() => {
    const userId = getCookie('userId')
    userId && dispatch(getCartlistAction({userId: userId}))
  }, [])

  console.log(datas, 'data')

  useEffect(() => {
    setUpdatedCartData(datas?.cartData?.[0]?.products)
  }, [datas?.cartData?.[0]?.products])

  const userId = getCookie('userId')

  const [selectedDistrict, setSelectedDistrict] = useState<any>()
  const [selectedMunicipality, setSelectedMunicipality] = useState<any>()

  const changeQuantity = (countQuantity, data) => {
    console.log('data chaiyo', countQuantity, data)
    // console.log(e.target.value, 'e.target value')
    const updatedCart = upatedcartData?.map((item: any, index: number) => {
      if (item._id !== data._id) {
        return item
      } else {
        return {
          ...item,
          quantity: countQuantity,
          price: Number(data?.productId?.discountedPrice * countQuantity)
        }
      }
    })

    console.log(data.quantity, 'data quantity')
    dispatch(
      updatedCartByProductIdAction({
        data: {
          userId: userId,
          productId: data?.productId?.id,
          quantity: countQuantity,
          price: Number(data?.productId?.discountedPrice * countQuantity)
        },
        onSuccess: () => {
          toast.success('Product on cart updated successfully')
          userId && dispatch(getCartlistAction({userId: userId}))
        }
      })
    )

    setUpdatedCartData(updatedCart)
  }

  // useEffect(() => {

  // }, [upatedcartData])

  console.log(selectedDistrict, 'selectedDistrict')

  const checkoutHandler = () => {
    console.log(userId, 'userID')
    userId &&
      dispatch(
        createOrderByUserIdAction({
          userId: userId,
          data: {
            userId: userId,
            products: upatedcartData?.map((item, index) => {
              console.log(item.price, item.count, 'price and quantity')
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
          onSuccess: (data: any) => {
            toast.success('Ordered placed successfully done')
            console.log('hello guys')

            console.log('delete product called')
            upatedcartData?.map((item, index) => {
              dispatch(
                delteProductFromCartAction({
                  userId: userId,
                  productId: item?._id,
                  onSuccess: () => {
                    dispatch(getCartlistAction({userId: userId}))
                    toast.success('Product Deleted from cart Successfully')
                  }
                })
              )
            })
          }
        })
      )
  }

  const [selectedArea, setSelectedArea] = useState<any>()

  console.log(upatedcartData, 'upatedCarddata hai')

  const [isHomeDelivery, setisHomeDelivery] = useState<any>(false)
  const [shippingPrice, setShippingPrice] = useState(200)
  console.log(isHomeDelivery, 'isHomeDelivery')
  useEffect(() => {
    const shippingCharges = districtArray
      .find((item) => {
        return item.district === selectedDistrict
      })
      ?.municipalities.find((item) => {
        return item.name === selectedMunicipality
      })?.areas[selectedArea]

    console.log(shippingCharges, isHomeDelivery, 'shipping charges')

    const finalShippingCost = isHomeDelivery.value
      ? shippingCharges?.homeDelivery
      : shippingCharges?.officeDelivery
    setShippingPrice(finalShippingCost)
  }, [isHomeDelivery, selectedDistrict, selectedMunicipality])

  console.log(shippingPrice, 'shipping  price')
  return (
    <div className="cartPage">
      <VStack gap="$3" style={{width: media.md ? '60%' : '100%'}}>
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
      <VStack style={{width: media.md ? '30%' : '100%'}} gap="$3">
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
                    return item.price
                  })
                  ?.reduce((acc, curr) => {
                    return acc + curr
                  }, 0)
              ) ?? 0}
            </p>
          </HStack>

          <HStack justify="space-between" align="center">
            <p>Shipping Area</p>

            {/* <SelectField
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
              width="100%"
              onChangeValue={(data) => setIsInsideValley((prev) => !prev)}
              placeholder={'Where from'}
            /> */}
          </HStack>

          <SelectField
            options={districtArray?.map((item, index) => {
              return {
                id: index,
                label: item.district,
                value: item.district
              }
            })}
            // value={selectedCateory}
            width="100%"
            onChangeValue={(data) => {
              console.log(data, 'data value')
              setSelectedDistrict(data.value)
            }}
            placeholder={'District'}
          />

          <SelectField
            options={districtArray
              ?.find((item, index) => {
                return item.district === selectedDistrict
              })
              ?.municipalities.map((items, index) => {
                return {
                  id: index,
                  label: items.name,
                  value: items.name
                }
              })}
            // value={selectedCateory}
            width="100%"
            onChangeValue={(data) => setSelectedMunicipality(data.value)}
            placeholder={'Municipality'}
          />

          <SelectField
            options={
              districtArray
                ?.find((item) => {
                  return item.district === selectedDistrict
                })
                ?.municipalities.find(
                  (item) => item.name === selectedMunicipality
                )?.areas
                ? Object.keys(
                    districtArray
                      ?.find((item) => item.district === selectedDistrict)
                      ?.municipalities.find(
                        (item) => item.name === selectedMunicipality
                      )?.areas
                  ).map((key, index) => ({
                    id: index,
                    label: key.replace(/_/g, ' '), // Optional: Replace underscores with spaces
                    value: key
                  }))
                : []
            }
            width="100%"
            onChangeValue={(data) => setSelectedArea(data.value)}
            placeholder={'Area'}
          />

          <SelectField
            // defaultValue={category?.[0]}
            options={[
              {
                id: 1,
                label: 'Home Delivery',
                value: true
              },
              {
                id: 2,
                label: 'Office Delivery',
                value: false
              }
            ]}
            width="320px"
            onChangeValue={(data) => setisHomeDelivery(data)}
            placeholder={'Delivery Type'}
          />
          <HStack justify="space-between" align="center">
            <p>Shipping Location</p>

            <InputField
              onChange={(e: any) => setShippingLocation(e.target.value)}
              placeholder="Enter full address"
            ></InputField>
          </HStack>
          <HStack
            style={{width: '100%'}}
            justify="space-between"
            align="center"
          >
            <p>Shipping Cost</p>
            <p>{shippingPrice}</p>
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
                    return item.price
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
    </div>
  )
}
