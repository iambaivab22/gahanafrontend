import React from 'react'
import {CompWrapper, VStack} from 'src/app/common'
import {
  CategorryContainer,
  MainCarousel,
  ProductSection
} from 'src/app/components'

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

          <ProductSection
            header="New Arrivals"
            isHomePage={true}
          ></ProductSection>
        </VStack>
      </CompWrapper>
    </>
  )
}
