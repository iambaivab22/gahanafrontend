import {HStack} from '../stack'

export const StatInfo = ({value, icon}: Com.StatInfoProps) => {
  return (
    <HStack justify={'center'} align={'center'} className="statInfoContainer" >
      <HStack align={'center'} className='statInfoContainer-icon'>{icon}</HStack>
      <span className='statInfoContainer-value'>{value}</span>
    </HStack>
  )
}
