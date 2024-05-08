// import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import moment from 'moment'

// import {ProductCard} from 'components/jobsCard/jobsCard.component'
import {useMedia} from 'src/hooks'

import {getImageUrl} from 'src/helpers/getImageUrl.helper'
import {Link, useNavigate} from 'react-router-dom'
import {ProductCard} from '../productCard'
import {useSelector, useDispatch} from 'src/store'
import {useEffect} from 'react'

import {getProductListAction} from 'src/app/pages/products/product.slice'

// import {IMAGES} from 'static'
// import Link from 'react-router-dom'

export const ProductSection = ({
  jobItems,
  header,
  itemOnGrid,
  isHomePage,
  homeCategory
}: any) => {
  const media = useMedia()
  // const dispatch = useDispatch()

  const dispatch = useDispatch()
  // const createdTime = (createdTime: string) => {
  //   if (!createdTime) {
  //     return ''
  //   }

  //   const duration = moment().diff(moment(createdTime))
  //   const createdAt = moment.duration(duration).humanize()
  //   return String(createdAt)
  // }

  useEffect(() => {
    console.log('api hit')
    dispatch(getProductListAction({}))
  }, [])

  const {data}: any = useSelector((state: any) => state.product)

  console.log(data, 'data from ps')
  const navigate = useNavigate()

  return (
    <div className="jobsSectionContainer">
      <div className="jobsSectionContainer-header">
        {header}

        <div className="jobsSectionContainer-header-right">
          {/* <div className="jobsSectionContainer-header-right-common">
              <IoIosArrowBack />
            </div>
            <div className="jobsSectionContainer-header-right-common">
              <IoIosArrowForward />
            </div> */}
        </div>
      </div>
      {/* {!!(!!jobItems && jobItems.length > 0) ? ( */}
      <div
        className="jobsSectionContainer-items"
        style={
          {
            // gridTemplateColumns: media.md ? `repeat(${itemOnGrid}, 1fr)` : ''
          }
        }
      >
        {data?.map((item: any, index: number) => {
          return <ProductCard data={item} key={item.id} />
        })}
      </div>
      {/* <Link to={'/profile/my-jobs'}>
        <a> */}

      {isHomePage && (
        <div
          className="jobsSectionContainer-seemore"
          onClick={() => {
            navigate(
              `/products?${
                homeCategory === 'isBestSelling'
                  ? 'isBestSelling=true'
                  : 'isNewArrivals=true'
              }`
            )
          }}
        >
          See more
        </div>
      )}
      {/* </a>
      </Link> */}
    </div>
  )
}
