import {colors} from 'src/modules'
import {HStack} from '../stack'

export const Chip = ({color, title, icon, ...rest}: Com.ChipProps) => {
  return (
    <HStack
      align="center"
      justify="center"
      gap="$3"
      className="chip-container"
      style={{backgroundColor: color ?? colors.grey100}}
      {...rest}
    >
      {icon && icon}
      <div className="chip">{title}</div>
    </HStack>
  )
}
