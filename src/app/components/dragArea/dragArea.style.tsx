import styled from 'styled-components'

import Theme from 'src/theme'

export const DragAreaContainer = styled.form`
  width: 100%;
  min-height: 100px;
  font-size: ${Theme.fontSizes.$3};
`

export const DragAreaLabelStyled = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  cursor: pointer;
  width: inherit;
  border: 1px solid ${Theme.colors.$aqua};
  border-radius: ${Theme.radius.$default};
  background-color: ${Theme.colors.$aquaLight};
`

export const ImagePreviewStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: inherit;
  margin: 20px 0;
`

export const ImageStyled = styled.img`
  height: 100%;
  object-fit: contain;
  width: 100%;
`
