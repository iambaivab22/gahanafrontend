import React, {useEffect, useState} from 'react'
import {FILE_URL} from 'src/config'
// import './ProductDisplay.scss'

const ProductDisplay = ({product}) => {
  const [quantity, setQuantity] = useState(1)

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  // Default product data if none is provided
  const defaultProduct = {
    name: 'Abhushan Gallery Panchadhatu Gold Plated Red Muga Earring With Multi Zircon For Women',
    originalPrice: 1300,
    discountedPrice: 799,
    discountPercentage: 39,
    image: '/api/placeholder/400/400',
    variant: 'Gold',
    features: [
      'Beautiful Ring , Feels special',
      'wow design',
      'best quality',
      'trendy',
      'design to die for'
    ]
  }

  console.log(product, 'data values')

  // Use provided product data or default
  const displayProduct = product || defaultProduct

  const [productImages, setProductImages] = useState([])

  useEffect(() => {
    const ProductImages = product?.images?.map((item: any, index: number) => {
      console.log(item.coloredImage, 'coloredimage')
      return item.coloredImage
    })

    setProductImages(ProductImages)
  }, [product])
  return (
    <div className="product-display">
      {/* Product Image */}
      <div className="product-image">
        {product?.images?.length > 0 ? (
          <img
            src={`${FILE_URL}/products/${productImages?.[0]}`}
            alt={product.name}
          />
        ) : (
          <div className="placeholder">No Image Available</div>
        )}
      </div>

      {/* Product Details */}
      <div className="product-details">
        <h1 className="product-title">{product?.name}</h1>
        <div className="price-container">
          <span className="price-original">₹{product?.originalPrice}</span>
          <span className="price-discounted">₹{product?.discountedPrice}</span>
          <span className="discount-badge">
            {product?.discountPercentage}% OFF
          </span>
        </div>
        <p className="shipping-text">Shipping is calculated at checkout</p>

        {/* Category and Subcategory */}
        <div className="category-info">
          <p>Category: {product?.category?.name}</p>
          <p>Subcategory: {product?.subCategory?.name}</p>
        </div>

        <div className="quantity-container">
          <button onClick={decreaseQuantity} className="quantity-button">
            −
          </button>
          <div className="quantity-display">{quantity}</div>
          <button onClick={increaseQuantity} className="quantity-button">
            +
          </button>
        </div>

        <button className="add-to-cart-button">ADD TO CART</button>
      </div>
    </div>
  )
}

export default ProductDisplay
