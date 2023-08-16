import * as React from 'react'
import {useTransition, animated} from '@react-spring/web'
import {useOutsideClick} from 'src/hooks'

export const Dropdown = ({
  children,
  trigger,
  active = false,
  isAnimated = true,
  animationType = 'expand',
  style,
  placement = 'bottomleft',
  outDismiss = true,
  inDismiss = false,
  triggerToggle = false
}: Com.Dropdown.DropdownProps) => {
  const containerRef: React.RefObject<HTMLDivElement> =
    React.useRef<HTMLDivElement>(null)

  const [dropdownActive, setDropdownActive] = React.useState<boolean>(active)

  //   const config = isAnimated
  //     ? getAnimationConfig(animationType)
  //     : { enterDuration: 0.001, exitDuration: 0.001 };

  //   const dropdownAnimation = useMountedValue(dropdownActive, [0, 1, 0], {});
  // INTERPOLATION
  const minScale = animationType === 'fade' ? 1 : 0.6
  const maxScale = 1
  let translateX: number
  if (placement === 'bottommiddle' || placement === 'topmiddle') {
    translateX = -50
  } else {
    translateX = 0
  }

  const dropdownAnimation = useTransition(dropdownActive, {
    from: {
      opacity: 0,
      transform: `scale(${minScale}) translateX(${translateX}%)`
    },
    enter: {
      opacity: 1,
      transform: `scale(${maxScale}) translateX(${translateX}%)`
    },
    leave: {
      opacity: 0,
      transform: `scale(${minScale}) translateX(${translateX}%)`
    },
    config: {
      duration: 200
    }
  })
  // Open dropdown method
  const openDropdown: () => void = React.useCallback(() => {
    if (!dropdownActive) {
      setDropdownActive(true)
    }
  }, [dropdownActive])

  // Open dropdown method
  const closeDropdown: () => void = () => {
    setDropdownActive(false)
  }

  // Toggle dropdown
  const toggleDropdown: () => void = React.useCallback(() => {
    if (dropdownActive) {
      closeDropdown()
    } else {
      openDropdown()
    }
  }, [dropdownActive])

  // Handle outside click on container
  if (outDismiss) {
    useOutsideClick(containerRef, () => {
      closeDropdown()
    })
  }

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block'
  }

  // Direction of dropdown menu
  const getDirectionStyles: (
    pm: Com.Dropdown.placementType
  ) => React.CSSProperties = (pm: Com.Dropdown.placementType) => {
    switch (pm) {
      case 'bottomleft':
        return {left: 0, top: '100%'}
      case 'bottommiddle':
        return {left: '50%', top: '100%'}
      case 'bottomright':
        return {right: 0, top: '100%'}
      case 'topleft':
        return {left: 0, bottom: '100%'}
      case 'topmiddle':
        return {left: '50%', bottom: '100%'}
      case 'topright':
        return {right: 0, bottom: '100%'}
    }
  }

  // Transform origin of dropdown animation
  const getTransformOrigin: (
    pm: Com.Dropdown.placementType
  ) => React.CSSProperties = (pm: Com.Dropdown.placementType) => {
    switch (pm) {
      case 'bottomleft':
        return {transformOrigin: '0% 0%'}
      case 'bottommiddle':
        return {transformOrigin: '0% 0%'}
      case 'bottomright':
        return {transformOrigin: '100% 0%'}
      case 'topleft':
        return {transformOrigin: '0% 100%'}
      case 'topmiddle':
        return {transformOrigin: '0% 100%'}
      case 'topright':
        return {transformOrigin: '100% 100%'}
    }
  }

  const dropdownElementStyles: React.CSSProperties = {}
  const dropdownMenuStyles: any = {
    zIndex: 100,
    whiteSpace: 'nowrap',
    ...getDirectionStyles(placement),
    ...getTransformOrigin(placement),
    ...style
  }

  // DismissOnElementClick
  const onClick = triggerToggle ? toggleDropdown : openDropdown

  return (
    <span ref={containerRef} style={containerStyles}>
      <span {...{onClick}} style={dropdownElementStyles}>
        {trigger({
          active: dropdownActive
        })}
      </span>
      {dropdownAnimation((animationStyle, mounted) => {
        return (
          mounted && (
            <animated.div
              onClick={() => (inDismiss ? closeDropdown() : false)}
              style={{
                ...dropdownMenuStyles,
                position: 'absolute',
                opacity: animationStyle.opacity,
                transform: animationStyle.transform
              }}
            >
              {children}
            </animated.div>
          )
        )
      })}
    </span>
  )
}
