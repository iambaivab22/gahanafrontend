import React, {
  // useState,
  useRef,
  // useCallback,
  useMemo,
  createContext,
} from 'react'

import {animated, useTransition} from '@react-spring/web'

import {useDisableScroll as useScrollDisable} from '../../../hooks'

// import {ReactPortal} from './components'

export var ModalContext = createContext({closeModal: () => {}, height: 0})

const getModalSize = (modalSize: string, width: number | string) => {
  switch (modalSize) {
    case 'full':
      return {width: width ?? '100vw'}
    case 'xl':
      return {width: width ?? '576px'}
    case 'lg':
      return {width: width ?? '512px'}
    case 'md':
      return {width: width ?? '448px'}
    case 'sm':
      return {width: width ?? '384px'}
    case 'xs':
      return {width: width ?? '320px'}
    default:
      return {width: width ?? '448px'}
  }
}

const getOverlay = (
  overlay: boolean,
  overlayBlur: number,
  overlayDark: boolean,
) => {
  const overlayStyle = overlay
    ? {
        backgroundColor: overlayDark
          ? `rgba(0, 0, 0, 0.4)`
          : `rgba(255,255,255, 0.4)`,
        backdropFilter: `blur(${overlayBlur}px)`,
      }
    : {
        backgroundColor: 'transparent',
        backdropFilter: `blur(0px)`,
      }

  return overlayStyle
}

export const Modal = ({
  children,
  visible,
  style,
  //   isAnimated = true,
  //   animationType = 'ease',
  disableScroll = true,
  modalContainerStyle,
  closeModal,
  modalSize = 'sm',
  width = '60vw',
  height = 0,
  overlay = true,
  overlayBlur = 5,
  overlayDark = true,
}: Com.ModalContainerProps) => {
  const modalRef = useRef(null)

  const modalOverlayStyle = getOverlay(overlay, overlayBlur, overlayDark)

  const size = useMemo(() => {
    return getModalSize(modalSize, width)
  }, [modalSize, width])

  const transitions = useTransition(visible, {
    from: {opacity: 0, backgroundColor: 'red', scale: 0.8},
    enter: {opacity: 1, backgroundColor: 'red', scale: 1},
    leave: {opacity: 0, backgroundColor: 'red', scale: 0.8},
    config: {
      duration: 100,
    },
  })

  useScrollDisable(disableScroll && visible)

  return transitions((animatedStyle, item) => {
    return (
      item && (
        <animated.div
          className="ContainerStyled"
          style={{
            opacity: animatedStyle.opacity,
            ...modalContainerStyle,
            ...modalOverlayStyle,
          }}
        >
          <animated.div
            className="ModalContentStyled"
            ref={modalRef}
            style={{
              scale: animatedStyle.scale,
              height: 'auto',
              ...size,
              ...style,
            }}
          >
            {children}
          </animated.div>
        </animated.div>
      )
    )
  })
}

// interface ModalProps {
//   triggerElement: React.ReactElement | React.ReactElement[]
//   active: boolean
//   containerStyle: object
//   triggerToggle?: () => void
//   children: React.ReactElement | React.ReactElement[]
//   withPortal: boolean
//   size: string
// }
// export const Modal = (props: ModalProps) => {
//   const {
//     triggerElement,
//     active,
//     containerStyle,
//     triggerToggle,
//     children,
//     withPortal = true,
//     size = 'lg'
//   } = props
//   const [isModalActive, setModalActive] = useState(active)

//   // Open Modal method
//   const openModal = useCallback(() => {
//     console.log('open')
//     if (!isModalActive) {
//       console.log(!isModalActive)
//       setModalActive(true)
//     }
//   }, [isModalActive])

//   // Open Modal method
//   const closeModal = () => {
//     setModalActive(false)
//   }

//   // Toggle Modal
//   const toggleModal = useCallback(() => {
//     if (isModalActive) {
//       closeModal()
//     } else {
//       openModal()
//     }
//   }, [isModalActive, openModal])

//   return (
//     <div style={{...containerStyle, position: 'relative'}}>
//       <span onClick={() => (triggerToggle ? toggleModal() : openModal())}>
//         {triggerElement}
//       </span>
//       {withPortal ? (
//         <ReactPortal>
//           <ModalContainer
//             {...props}
//             visible={isModalActive}
//             closeModal={closeModal}
//             modalSize={size}
//           >
//             {children}
//           </ModalContainer>
//         </ReactPortal>
//       ) : (
//         <ModalContainer
//           {...props}
//           visible={isModalActive}
//           closeModal={closeModal}
//           modalSize={size}
//         >
//           {children}
//         </ModalContainer>
//       )}
//     </div>
//   )
// }
