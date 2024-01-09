import React from 'react'
import {FaQuoteLeft, FaQuoteRight} from 'react-icons/fa'

export const TestimonailSection = ({reviews}: any) => {
  return (
    <div className="flex flex-col w-[100vw] h-[100vh] justify-center items-center bg-gray-200">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Our Reviews</h1>

        <div className="bg-violet-400 h-[4px] w-1/5 mt-1 mx-auto"></div>

        <Testimonials reviews={reviews} />
      </div>
    </div>
  )
}

import {FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import {useState} from 'react'
import {HStack, VStack} from 'src/app/common'

export const Testimonials = (props) => {
  let reviews = props.reviews
  const [index, setIndex] = useState(0)

  function leftShiftHandler() {
    if (index - 1 < 0) {
      setIndex(reviews.length - 1)
    } else {
      setIndex(index - 1)
    }
  }

  function rightShiftHandler() {
    if (index + 1 >= reviews.length) {
      setIndex(0)
    } else {
      setIndex(index + 1)
    }
  }

  function surpriseHandler() {
    let randomIndex = Math.floor(Math.random() * reviews.length)
    setIndex(randomIndex)
  }

  return (
    <div
      className="w-[85vw] md:w-[700px] bg-white flex flex-col justify-center items-center
    mt-10 p-10 transition-all duration-700 hover:shadow-xl rounded-md"
    >
      <Card review={reviews[index]}></Card>

      <div className="flex text-3xl mt-10 gap-3 text-violet-400 font-bold mx-auto">
        <button
          onClick={leftShiftHandler}
          className="cursor-pointer hover:text-violet-500 "
        >
          <FiChevronLeft />
        </button>
        <button
          onClick={rightShiftHandler}
          className="cursor-pointer hover:text-violet-500 "
        >
          <FiChevronRight />
        </button>
      </div>

      <div className="mt-6">
        <button
          onClick={surpriseHandler}
          className="bg-violet-400 hover:bg-violet-500 transition-all duration-200
        cursor-pointer px-10 py-2 rounded-md font-bold text-white text-lg"
        >
          Surprise Me
        </button>
      </div>
    </div>
  )
}

export const Card = (props) => {
  let review = props.review
  return (
    <VStack gap="$4">
      <div
        className="absolute top-[-7rem] z-[10] mx-auto"
        style={{
          position: 'absolute',
          top: '-7rem',
          zIndex: '10',
          margin: 'auto'
        }}
      >
        <img
          alt=""
          className="aspect-square rounded-full w-[140px] h-[140px] z-[25]"
          style={{width: '140px', height: '140px', zIndex: '25'}}
          src={review.image}
        />
        <div
          className="w-[140px] h-[140px] bg-violet-500 rounded-full absolute
         top-[-6px] z-[-10] left-[10px]"
          style={{
            width: '140px',
            height: '140px',
            left: '10px',
            zIndex: 10,
            top: '-6px',
            position: 'absolute',
            background: 'red'
          }}
        ></div>
      </div>

      <div className="text-center mt-7">
        <p className="tracking-wider font-bold text-2xl capitalize">
          {review.name}
        </p>
        <p className="text-violet-300 uppercase text-sm">{review.job}</p>
      </div>

      <div className="text-violet-400 mx-auto mt-5">
        <FaQuoteLeft />
      </div>

      <div
        className="text-center mt-4 text-slate-500"
        style={{textAlign: 'center', marginTop: '10px', color: 'slate'}}
      >
        {review.text}
      </div>

      <div
        className="text-violet-400 mx-auto mt-5"
        style={{color: 'violet', margin: 'auto'}}
      >
        <FaQuoteRight />
      </div>
    </VStack>
  )
}
