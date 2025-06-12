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
import {
  Button,
  CheckBox,
  HStack,
  InputField,
  Label,
  SelectField,
  VStack
} from 'src/app/common'
import {getNprPrice} from 'src/helpers/nprPrice.helper'
import toast from 'react-hot-toast'
import {useMeasure, useMedia} from 'src/hooks'
import {HiDatabase} from 'react-icons/hi'
import {TextArea} from 'src/app/common/textArea'
import {CONTACT_NUMBER} from 'src/config/constant.config'
export const CartPage = () => {
  const dispatch = useDispatch()
  const datas = useSelector((state: any) => state.cart)
  const [upatedcartData, setUpdatedCartData] = useState(
    datas?.cartData?.[0]?.products ?? []
  )

  const [phoneNumber, setPhoneNumber] = useState('')

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
  const [isShippingSame, setIsShippingSame] = useState(true)
  useEffect(() => {
    setUpdatedCartData(datas?.cartData?.[0]?.products)
  }, [datas?.cartData?.[0]?.products])

  const userId = getCookie('userId')

  const [selectedDistrict, setSelectedDistrict] = useState<any>()
  const [selectedMunicipality, setSelectedMunicipality] = useState<any>()

  const [orderNote, setOrderNote] = useState('')

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
  const [productOrderId, setProductOrderId] = useState('ord-123456')
  console.log(selectedDistrict, 'selectedDistrict')
  const generateOrderId = () => {
    const timestamp = Date.now()
    const randomPart = Math.floor(Math.random() * 1000000)
    const newOrderId = `ORD-${timestamp}-${randomPart}`
    setProductOrderId(newOrderId)
    return newOrderId
  }
  const checkoutHandler = () => {
    console.log(userId, 'userID value', new Date(Date.now()).toLocaleString())
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
            OrderedAt: new Date(Date.now()).toLocaleString(),
            productOrderId: generateOrderId(),
            shippingLocation: `${selectedDistrict}, ${selectedMunicipality}-${selectedArea}`
          },
          onSuccess: (data: any) => {
            toast.success('Ordered placed successfully done')
            clearShippingDetails()
            // handleClick()

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
          },

          onFailure: (error: any) => {
            toast.error('Could not place order')
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
    const shippingCharges = (districtArray as any)
      .find((item) => {
        return item.district === selectedDistrict
      })
      ?.municipalities?.find((item) => {
        return item.name === selectedMunicipality
      })?.areas[selectedArea]

    console.log(shippingCharges, isHomeDelivery, 'shipping charges')

    const finalShippingCost = isHomeDelivery.value
      ? shippingCharges?.homeDelivery
      : shippingCharges?.officeDelivery
    setShippingPrice(finalShippingCost)
  }, [isHomeDelivery, selectedDistrict, selectedMunicipality])

  console.log(shippingPrice, 'shipping  price')

  const clearShippingDetails = () => {
    console.log('data values fast data ')
    setIsShippingSame(true)
    setIsInsideValley(true)
    setShippingLocation('')
    setSelectedDistrict(null)
    setSelectedMunicipality(null)
    setSelectedArea(null)
    setOrderNote('')
    setisHomeDelivery(false)
  }

  const handleIsPhonePayment = (value: any) => {
    console.log(value, 'value clicked value')
    setIsPhonePayment(value)
    setIsCashOnDelivery(false)
  }
  const handleCashOnDelivery = (value: any) => {
    console.log(value, 'value clicked value')
    setIsCashOnDelivery(value)
    setIsPhonePayment(false)
  }

  const [isPhonePayment, setIsPhonePayment] = useState(false)
  const [isCashOnDelivery, setIsCashOnDelivery] = useState(false)

  const phoneNumbers = '9779867072373' // Nepal country code + number
  const message = "Hello! I' "

  const [showNotice, setShowNotice] = useState(false)

  const handleClick = () => {
    setShowNotice(true)
    console.log(productOrderId, 'productOrderId value data')

    const message = `नमस्ते, मैले यो अर्डर ID को लागि भुक्तानीको फोटो (screenshot) जोडेको छु: ${
      productOrderId ?? '454'
    }।

कृपया मेरो अर्डरको स्टाटस जानकारी दिनुहोस्।`

    const whatsappUrl = `https://wa.me/9779867072373?text=${encodeURIComponent(
      message
    )}`

    // Open in a new tab
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="cartPage">
      <VStack gap="$3" style={{width: media.md ? '55%' : '100%'}}>
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
      <VStack style={{width: media.md ? '40%' : '100%'}} gap="$3">
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
            <p>Is it Outside Valley?</p>

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
              width="100%"
              onChangeValue={(data) => setIsInsideValley((prev) => !prev)}
              placeholder={'Is Outside Kathmandu Valley?'}
              containerStyle={{width: '100%'}}
            />
          </HStack>
          <HStack
            justify="space-between"
            align="center"
            style={{width: '100%', gap: '20px'}}
          >
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
              containerStyle={{width: '100%'}}
              value={selectedDistrict}
            />

            <SelectField
              options={(districtArray as any)
                ?.find((item, index) => {
                  return item.district === selectedDistrict
                })
                ?.municipalities?.map((items, index) => {
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
              containerStyle={{width: '100%'}}
              value={selectedMunicipality}
            />
          </HStack>

          <HStack
            justify="space-between"
            align="center"
            style={{width: '100%', gap: '20px'}}
          >
            <SelectField
              options={
                (districtArray as any)
                  ?.find((item) => {
                    return item.district === selectedDistrict
                  })
                  ?.municipalities?.find(
                    (item) => item.name === selectedMunicipality
                  )?.areas
                  ? Object.keys(
                      (districtArray as any)
                        ?.find((item) => item.district === selectedDistrict)
                        ?.municipalities?.find(
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
              containerStyle={{width: '100%'}}
              value={selectedArea}
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
              width="100%"
              onChangeValue={(data) => setisHomeDelivery(data)}
              placeholder={'Delivery Type'}
              containerStyle={{width: '100%'}}
            />
          </HStack>
          <HStack justify="space-between" align="center" gap="$4">
            <p>Shipping Location</p>

            <InputField
              onChange={(e: any) => setShippingLocation(e.target.value)}
              placeholder="Enter full address"
              style={{
                border: '2px solid red  !important',
                background: 'transsparent'
              }}
              value={shippingLocation}
            ></InputField>
            <InputField
              onChange={(e: any) => setPhoneNumber(e.target.value)}
              placeholder="Enter Phone Number"
              style={{
                border: '2px solid red !important',
                background: 'transparent'
              }}
            ></InputField>
          </HStack>

          <HStack
            style={{width: '100%'}}
            justify="space-between"
            align="center"
          >
            <p>Shipping Cost</p>
            <p>{getNprPrice(shippingPrice) ?? 0}</p>
          </HStack>

          <HStack>
            <CheckBox
              value="best selling"
              label="Shipping Address is same as billing address"
              name="bestselling"
              check={isShippingSame}
              handleCheckboxChange={(data) => {
                console.log('isShippingSame', data)
                setIsShippingSame(data)
              }}
            />
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
                  }, 0) + shippingPrice
              )}
            </p>
          </HStack>

          <VStack style={{width: '100%'}}>
            <p>Order Note</p>
            <TextArea
              onChange={(e: any) => setOrderNote(e.target.value)}
              style={{width: '100%', fontSize: '16px'}}
              value={orderNote}
            />
          </VStack>

          <VStack style={{width: '100%'}}>
            <CheckBox
              value="phonePayDelivery"
              label="Phone Pay Delivery"
              name="phonepaydelivery"
              check={isPhonePayment}
              handleCheckboxChange={handleIsPhonePayment}
            />

            {isPhonePayment && (
              <div style={{marginTop: '10px'}}>
                <p style={{fontWeight: 'bold'}}>Scan the QR to pay.</p>
                <p>
                  Note: Product will be delivered only after confirmation of the
                  payment from Fonepay
                </p>
                <p>
                  Once you've completed the payment, please send a screenshot of
                  the payment confirmation to our WhatsApp.
                </p>
                <img
                  src="src/assets/images/qrbanksample.jpg"
                  alt="image"
                  className="qrImage"
                  style={{marginTop: '10px'}}
                />
              </div>
            )}

            <CheckBox
              value="cashOnDelivery"
              label="Cash On Delivery"
              name="cash on delivery"
              check={isCashOnDelivery}
              handleCheckboxChange={handleCashOnDelivery}
            />
          </VStack>
        </VStack>
        <HStack
          align="center"
          justify="center"
          className="cartPage-checkout"
          onClick={checkoutHandler}
        >
          Checkout
        </HStack>

        <p>
          Need help? For Order details
          <a href={`tel:${CONTACT_NUMBER}`}> Call us: {CONTACT_NUMBER}</a>
        </p>
      </VStack>
    </div>
  )
}
