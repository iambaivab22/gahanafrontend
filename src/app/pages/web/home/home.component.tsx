import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import React, {useEffect, useRef} from 'react'
import {CompWrapper, VStack} from 'src/app/common'
import {
  CategorryContainer,
  MainCarousel,
  ProductSection
} from 'src/app/components'
import {TestimonailSection} from 'src/app/components/testimonial/testimonial.component'

export const HomePage = () => {
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

          {/* <TestimonailSection
            reviews={[
              {
                id: 1,
                name: 'Sanjesh',
                image: 'src/assets/images/products/jewellery-3.jpg',
                job: 'Software engineer',
                text: 'lorem fjdslkfjdlskajflksdjflksdjflkdsajflkdsajflkdsjflksdjflksdjkldsjflksdfj'
              },
              {
                id: 2,
                name: 'Ram',
                image: 'src/assets/images/products/jewellery-1.jpg',
                job: 'Business Man',
                text: 'lorem fjdslkfjdlskajflksdjflksdjflkdsajflkdsajflkdsjflksdjflksdjkldsjflksdfj'
              },
              {
                id: 3,
                name: 'Shyam',
                image: 'src/assets/images/products/jewellery-2.jpg',
                job: 'No Business Man',
                text: 'lorem fjdslkfjdlskajflksdjflksdjflkdsajflkdsajflkdsjflksdjflksdjkldsjflksdfj'
              }
            ]}
            
          ></TestimonailSection> */}
        </VStack>
      </CompWrapper>
    </>
  )
}
