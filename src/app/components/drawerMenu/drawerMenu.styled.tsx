import styled from 'styled-components'
import chroma from 'chroma-js'

import {HStack, VStack} from 'src/app/common'

import Theme from 'src/theme'

const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const HeaderDrawerMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: ${chroma('black').alpha(0.2).css()};
`

export const HeaderDrawerMenuContainer = styled(VStack)`
  margin: 0;
  padding: 30px;
  height: inherit;

  background-color: ${Theme.colors.$primary100};
`

export const DrawerMenuHeader = styled(HStack)``

export const Logo = styled(FlexCenter)`
  cursor: pointer;
`

export const LogoIcon = styled(FlexCenter)`
  width: 55px;
  height: 55px;
`

export const HeaderName = styled.div`
  font-size: ${Theme.fontSizes.$5};
  margin: 0 ${Theme.space.$1};
  font-weight: ${Theme.fontWeights.$bold};
`

export const CloseIcon = styled(FlexCenter)`
  cursor: pointer;
  border: 1px solid ${Theme.colors.$borderPrimary};
  padding: ${Theme.space.$2};
  background: ${Theme.colors.$backgroundPrimary};
  border-radius: ${Theme.radius.$default};
  transition: all 0.3s ease-in-out;
  &:hover {
    background: ${Theme.colors.$gray100};
  }
`

export const DrawerMenuBody = styled(VStack)`
  padding: 30px 0;
  font-size: ${Theme.fontSizes.$3};
  font-weight: ${Theme.fontWeights.$normal};

  &::-webkit-scrollbar {
    width: 0px;
    height: 2px;
    display: none !important;
  }
`

export const DrawerMenuItem = styled(HStack)`
  padding: ${Theme.space.$3} 0;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: ${Theme.colors.$primary100};
  }
`

export const HorizontalMenuBreak = styled.div`
  background-color: ${Theme.colors.$borderPrimary};
  height: 1px;
`

export const DrawerMenuFooterText = styled.div`
  font-size: ${Theme.fontSizes.$2};
  font-weight: ${Theme.fontWeights.$normal};
`
