import React, {useState} from 'react'
import toast from 'react-hot-toast'
import {AiOutlineClose, AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai'
import {HStack, InputField, VStack} from 'src/app/common'
import {
  delteProductFromCartAction,
  getCartlistAction
} from 'src/app/pages/web/cart/cart.slice'
import {getCookie} from 'src/helpers'
import {getNprPrice} from 'src/helpers/nprPrice.helper'
import {useDispatch} from 'src/store'

export const CartCard = ({
  data,
  onChangePrice
}: {
  data: any
  onChangePrice: (e: any, data: any) => void
}) => {
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()
  const userId = getCookie('userId')

  const deleteProductFromCart = () => {
    console.log('delete product called')
    dispatch(
      delteProductFromCartAction({
        userId: userId,
        productId: data?._id,
        onSuccess: () => {
          dispatch(getCartlistAction({userId: userId}))
          toast.success('Product Deleted from cart Successfully')
        }
      })
    )
  }
  return (
    <div className="cartCard-container">
      <HStack className="cartCard">
        <HStack className="cartCard-left" gap="$3">
          <HStack className="cartCard-left-image">
            <img
              src={`http://localhost:8000/products/${data?.productId?.images[0]?.coloredImage[0]}`}
            />
          </HStack>
          <VStack className="cartCard-left-detail">
            <p className="cartCard-left-detail-name">{data?.productId?.name}</p>
            <p className="cartCard-left-detail-color">
              <span>Color:</span>Red,White
            </p>
          </VStack>
        </HStack>
        <HStack className="cartCard-right" justify="space-between">
          <HStack className="cartCard-right-price" align="center" gap="$4">
            <p className="eachItemPrice">
              {getNprPrice(data?.productId?.discountedPrice)}
            </p>
          </HStack>
          <HStack className="cartCard-right-quantity" align="center" gap="$3">
            {/* <p>Quantity:</p> */}
            <div
              style={{cursor: 'pointer', fontWeight: 'bold'}}
              onClick={() => {
                setQuantity((prev) => Number(prev) + 1)
                onChangePrice(quantity + 1, data)
              }}
            >
              <AiOutlinePlus />
            </div>
            <InputField
              // style={{width: '40%'}}
              type="number"
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                console.log(e.target.value, 'value changes hai')
                setQuantity(e.target.value)
                onChangePrice(e.target.value, data)
              }}
              placeholder="item quantity"
              value={quantity}
            ></InputField>
            <div
              style={{cursor: 'pointer', fontWeight: 'bold'}}
              onClick={() => {
                setQuantity((prev) => Number(prev - 1))
                onChangePrice(quantity - 1, data)
              }}
            >
              <AiOutlineMinus />
            </div>
          </HStack>
          <HStack align="center" className="totalltemPrice">
            {getNprPrice(Number(data?.productId?.discountedPrice) * quantity)}
          </HStack>

          <HStack className="cartCard-right-cancel" align="center" gap="$3">
            <AiOutlineClose
              size={20}
              onClick={deleteProductFromCart}
            ></AiOutlineClose>
          </HStack>
        </HStack>
      </HStack>
    </div>
  )
}
