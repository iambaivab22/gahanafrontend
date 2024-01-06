// import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import moment from 'moment'

// import {ProductCard} from 'components/jobsCard/jobsCard.component'
import {useMedia} from 'src/hooks'

import {getImageUrl} from 'src/helpers/getImageUrl.helper'
import {Link} from 'react-router-dom'
import {ProductCard} from '../productCard'

// import {IMAGES} from 'static'
// import Link from 'react-router-dom'

export const ProductSection = ({
  jobItems,
  header,
  itemOnGrid,
  isHomePage
}: any) => {
  const media = useMedia()

  // const createdTime = (createdTime: string) => {
  //   if (!createdTime) {
  //     return ''
  //   }

  //   const duration = moment().diff(moment(createdTime))
  //   const createdAt = moment.duration(duration).humanize()
  //   return String(createdAt)
  // }

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
        style={{
          gridTemplateColumns: media.md ? `repeat(${itemOnGrid}, 1fr)` : ''
        }}
      >
        {[1, 2, 3, 4].map((jobs: any, index: number) => {
          return <ProductCard />
        })}
      </div>
      {/* <Link to={'/profile/my-jobs'}>
        <a> */}

      {isHomePage && (
        <div className="jobsSectionContainer-seemore">See more</div>
      )}
      {/* </a>
      </Link> */}
    </div>
  )
}
