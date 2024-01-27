const reviews = [
  {
    id: 1,
    name: 'susan smith',
    job: 'web developer',
    image:
      'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg',
    text: "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry"
  },
  {
    id: 2,
    name: 'anna johnson',
    job: 'web designer',
    image:
      'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883409/person-2_np9x5l.jpg',
    text: 'Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.'
  },
  {
    id: 3,
    name: 'peter jones',
    job: 'intern',
    image:
      'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg',
    text: 'Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.'
  },
  {
    id: 4,
    name: 'bill anderson',
    job: 'the boss',
    image:
      'https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg',
    text: 'Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. '
  }
]

import React, {useState} from 'react'

import {FaChevronLeft, FaChevronRight, FaQuoteRight} from 'react-icons/fa'
import {Text, Title} from 'src/app/common'

export const TestimonailSection = ({reviews}) => {
  const [index, setIndex] = useState(0)
  const {description, image} = reviews[index]
  console.log(reviews[index], 'index')

  console.log(reviews, 'reviews')
  // console.log(re, 'image')
  // console.log(image, 'image')

  const checkNumber = (number) => {
    if (number > reviews.length - 1) {
      return 0
    } else if (number < 0) {
      return reviews.length - 1
    }
    return number
  }

  const nextPerson = () => {
    setIndex((index) => {
      let newIndex = index + 1
      return checkNumber(newIndex)
    })
  }

  const prevPerson = () => {
    setIndex((index) => {
      let newIndex = index - 1
      return checkNumber(newIndex)
    })
  }

  const randomPerson = () => {
    let randomNumber = Math.floor(Math.random() * reviews.length)
    if (randomNumber === index) {
      randomNumber = index + 1
    }
    setIndex(checkNumber(randomNumber))
  }

  return (
    <>
      <div className="jobsSectionContainer-header">WHAT OUR CUSTOMER SAYS</div>
      <article className="review">
        <div className="img-container">
          <img
            src={`http://localhost:8000/testimonial/${image?.[0]}`}
            className="person-img"
          />
          <span className="quote-icon">
            <FaQuoteRight />
          </span>
        </div>
        {/* <h4 className="author">{name}</h4> */}
        {/* <p className="jon">{job}</p> */}
        <p className="info">{reviews[index].description}</p>
        <div className="button-container">
          <button className="prev-btn" onClick={prevPerson}>
            <FaChevronLeft />
          </button>
          <button className="next-btn" onClick={nextPerson}>
            <FaChevronRight />
          </button>
        </div>
        {/* <button className="random-btn" onClick={randomPerson}>
        Suprise Me!
      </button> */}
      </article>
    </>
  )
}
