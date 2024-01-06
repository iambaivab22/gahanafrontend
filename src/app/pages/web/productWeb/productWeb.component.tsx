import React from 'react'
import ReactStarsRating from 'react-awesome-stars-rating'

export const ProductWeb = () => {
  const ratingChange = (value: number) => {
    console.log(value, 'rating value')
  }
  return (
    // <div className="showcase-container">
    //   <div className="showcase">
    //     <a href="#" className="showcase-img-box">
    //       <img
    //         src="./assets/images/products/1.jpg"
    //         alt="baby fabric shoes"
    //         width="75"
    //         height="75"
    //         className="showcase-img"
    //       />
    //     </a>

    //     <div className="showcase-content">
    //       <a href="#">
    //         <h4 className="showcase-title">baby fabric shoes</h4>
    //       </a>

    //       <div className="showcase-rating">
    //         {/* <ion-icon name="star"></ion-icon>
    //       <ion-icon name="star"></ion-icon>
    //       <ion-icon name="star"></ion-icon>
    //       <ion-icon name="star"></ion-icon>
    //       <ion-icon name="star"></ion-icon> */}
    //       </div>

    //       <div className="price-box">
    //         <del>$5.00</del>
    //         <p className="price">$4.00</p>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="showcase">
    //     <a href="#" className="showcase-img-box">
    //       <img
    //         src="src/assets/images/products/2.jpg"
    //         alt="men's hoodies t-shirt"
    //         className="showcase-img"
    //         width="75"
    //         height="75"
    //       />
    //     </a>

    //     <div className="showcase-content">
    //       <a href="#">
    //         <h4 className="showcase-title">men's hoodies t-shirt</h4>
    //       </a>
    //       <div className="showcase-rating">
    //         <ReactStarsRating size={15} onChange={ratingChange} value={3} />
    //       </div>

    //       <div className="price-box">
    //         <del>$17.00</del>
    //         <p className="price">$7.00</p>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="showcase">
    //     <a href="#" className="showcase-img-box">
    //       <img
    //         src="src/assets/images/products/3.jpg"
    //         alt="girls t-shirt"
    //         className="showcase-img"
    //         width="75"
    //         height="75"
    //       />
    //     </a>

    //     <div className="showcase-content">
    //       <a href="#">
    //         <h4 className="showcase-title">girls t-shirt</h4>
    //       </a>
    //       <div className="showcase-rating">
    //         {/* <ion-icon name="star"></ion-icon>
    //       <ion-icon name="star"></ion-icon>
    //       <ion-icon name="star"></ion-icon>
    //       <ion-icon name="star"></ion-icon>
    //       <ion-icon name="star-half-outline"></ion-icon> */}
    //       </div>

    //       <div className="price-box">
    //         <del>$5.00</del>
    //         <p className="price">$3.00</p>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="showcase">
    //     <a href="#" className="showcase-img-box">
    //       <img
    //         src="src/assets/images/products/4.jpg"
    //         alt="woolen hat for men"
    //         className="showcase-img"
    //         width="75"
    //         height="75"
    //       />
    //     </a>

    //     <div className="showcase-content">
    //       <a href="#">
    //         <h4 className="showcase-title">woolen hat for men</h4>
    //       </a>
    //       <div className="showcase-rating">
    //         {/* <ion-icon name="star"></ion-icon>
    //       <ion-icon name="star"></ion-icon>
    //       <ion-icon name="star"></ion-icon>
    //       <ion-icon name="star"></ion-icon>
    //       <ion-icon name="star"></ion-icon> */}
    //       </div>

    //       <div className="price-box">
    //         <del>$15.00</del>
    //         <p className="price">$12.00</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="showcase">
      <div className="showcase-banner">
        <img
          src="src/assets/images/products/shampoo.jpg"
          alt="shampoo, conditioner & facewash packs"
          className="showcase-img"
        />
      </div>

      <div className="showcase-content">
        <div className="showcase-rating">
          {/* <ion-icon name="star"></ion-icon>
        <ion-icon name="star"></ion-icon>
        <ion-icon name="star"></ion-icon>
        <ion-icon name="star-outline"></ion-icon>
        <ion-icon name="star-outline"></ion-icon> */}

          <ReactStarsRating size={15} onChange={ratingChange} value={3} />
        </div>

        <a href="#">
          <h3 className="showcase-title">
            shampoo, conditioner & facewash packs
          </h3>
        </a>

        <p className="showcase-desc">
          Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor dolor sit
          amet consectetur Lorem ipsum dolor
        </p>

        <div className="price-box">
          <p className="price">$150.00</p>

          <del>$200.00</del>
        </div>

        <button className="add-cart-btn">add to cart</button>

        <div className="showcase-status">
          <div className="wrapper">
            <p>
              already sold: <b>20</b>
            </p>

            <p>
              available: <b>40</b>
            </p>
          </div>

          <div className="showcase-status-bar"></div>
        </div>

        <div className="countdown-box">
          <p className="countdown-desc">Hurry Up! Offer ends in:</p>

          <div className="countdown">
            <div className="countdown-content">
              <p className="display-number">360</p>

              <p className="display-text">Days</p>
            </div>

            <div className="countdown-content">
              <p className="display-number">24</p>
              <p className="display-text">Hours</p>
            </div>

            <div className="countdown-content">
              <p className="display-number">59</p>
              <p className="display-text">Min</p>
            </div>

            <div className="countdown-content">
              <p className="display-number">00</p>
              <p className="display-text">Sec</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
