import {VStack, Label} from 'src/app/common'
import Theme from 'src/theme'
import styled, {css} from 'styled-components'

interface DetailProps {
  title: React.ReactNode
  children: React.ReactNode
  isDescription?: boolean
}

interface DetailContent extends React.ComponentPropsWithoutRef<'div'> {
  isDescription?: boolean
}

export const Detail = ({title, children, isDescription}: DetailProps) => {
  return (
    <VStack justify="start" align="start" gap="$0">
      <Label labelName={title} />
      <DetailContentStyled isDescription={isDescription}>
        {children}
      </DetailContentStyled>
    </VStack>
  )
}

const DetailContentStyled = styled.div<DetailContent>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  font-size: ${Theme.fontSizes.$3};
  ${({isDescription}) =>
    isDescription &&
    css`
      border: 1px solid ${Theme.colors.$borderInput};
      border-radius: ${Theme.radius.$default};
      padding: ${Theme.space.$3};
    `}
`
