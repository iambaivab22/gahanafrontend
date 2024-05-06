import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {CompWrapper, HStack, VStack} from 'src/app/common'
import {
  CategorryContainer,
  MainCarousel,
  ProductSection,
  ShopByBudgetWeb,
  WatchAndShopSection
} from 'src/app/components'
import {TestimonailSection} from 'src/app/components/testimonial/testimonial.component'
import {useDispatch, useSelector} from 'src/store'
import {getTestimonialListAction} from '../../testimonial/testimonial.slice'
import {getShopByBudgetListAction} from '../../shopByBudget/shopByBudget.slice'
import {getProductListAction} from '../../products/product.slice'

export const HomePage = () => {
  const dispatch = useDispatch()

  const {testimonialData} = useSelector((state: any) => state.testimonial)
  const {shopByBudgetData} = useSelector((state: any) => state.shopByBudget)
  const {data}: any = useSelector((state: any) => state.product)

  const [testimonialList, setTestimonialList] = useState([])

  const getTestimonialData = () =>
    useCallback(() => {
      // const remappedTestimonialData = testimonialData?.map(
      //   (item: any, index: number) => {
      //     return {
      //       image: item.testimonialImage,
      //       description: item.testimonialDescription
      //     }
      //   }
      // )
      // console.log('callback')
      // console.log('***')
      // setTestimonialList(remappedTestimonialData)
    }, [testimonialData])

  useEffect(() => {
    const remappedTestimonialData = testimonialData?.map(
      (item: any, index: number) => {
        return {
          image: item.testimonialImage,
          description: item.testimonialDescription
        }
      }
    )

    console.log('callback', remappedTestimonialData)
    // console.log('***')

    setTestimonialList(remappedTestimonialData)
  }, [testimonialData])

  const {data: watchandshopdata}: any = useSelector(
    (state: any) => state.product
  )

  console.log(watchandshopdata, 'watch and shop dataa')

  useEffect(() => {
    dispatch(
      getTestimonialListAction({
        onSuccess: () => {}
      })
    )

    dispatch(
      getShopByBudgetListAction({
        onSuccess: () => {
          console.log('got all')
        }
      })
    )

    dispatch(
      getProductListAction({
        onSuccess: () => {
          console.log('successfully hitted')
        },
        query: {
          search: ''
        }
      })
    )
  }, [])
  return (
    <>
      <MainCarousel></MainCarousel>
      <CompWrapper>
        <CategorryContainer></CategorryContainer>
      </CompWrapper>

      <CompWrapper>
        <VStack gap="$4">
          <ProductSection
            header="Best Selling"
            isHomePage={true}
          ></ProductSection>
          <div>
            <ProductSection
              header="New Arrivals"
              isHomePage={true}
            ></ProductSection>
          </div>
          {testimonialList?.length > 0 && (
            <TestimonailSection reviews={testimonialList}></TestimonailSection>
          )}
          <VStack gap="$8">
            <div className="jobsSectionContainer-header">WATCH AND SHOP</div>
            <WatchAndShopSection
              data={watchandshopdata?.filter((item: any, index: number) => {
                return item.isWatchAndShop === true
              })}
            ></WatchAndShopSection>

            <VStack gap="$3">
              <div className="jobsSectionContainer-header">SHOP BY BUDGET</div>

              <HStack justify="center" gap="$5" style={{width: '100%'}}>
                {shopByBudgetData?.map((item, index) => {
                  return <ShopByBudgetWeb data={item}></ShopByBudgetWeb>
                })}
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </CompWrapper>
    </>
  )
}
