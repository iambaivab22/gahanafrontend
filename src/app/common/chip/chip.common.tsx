import {colors} from 'src/modules'
import {HStack} from '../stack'

export const Chip = ({color, title, icon, style, ...rest}: Com.ChipProps) => {
  return (
    <div
      className="chip-container"
      style={{
        ...style,
        backgroundColor: color ?? colors.grey100
      }}
      {...rest}
    >
      {icon && icon}
      <div className="chip">{title}</div>
    </div>
  )
}
