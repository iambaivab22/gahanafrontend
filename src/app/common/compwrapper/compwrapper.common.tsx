import {useSpring, animated} from '@react-spring/web'
import {useAuth} from '../../routing'
// import {Header} from '../header/header.common'
// import {Header} from '../header/header.common'

export const CompWrapper = ({
  children,
  style,
  ...rest
}: Com.CompWrapperProps) => {
  const {sidenavExpand} = useAuth()
  const {paddingLeft} = useSpring({paddingLeft: sidenavExpand ? 300 : 110})

  return (
    <animated.div
      className="compwrapper-container"
      style={{
        paddingLeft: paddingLeft
      }}
    >
      {/* <Header /> */}
      <div className="compwrapper" style={style} {...rest}>
        {children}
      </div>
    </animated.div>
  )
}
