import {ComponentPropsWithoutRef} from 'react'

import {useMedia} from 'src/hooks'
import Theme from 'src/theme'

interface CardsGridProps extends ComponentPropsWithoutRef<'div'> {
  repeat?: number
}

export const CardsGrid: React.FC<CardsGridProps> = ({children, repeat = 4}) => {
  const media = useMedia()

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: media.xl
          ? `repeat(${repeat}, 1fr)`
          : media.lg
          ? `repeat(${repeat - 1}, 1fr)`
          : media.sm
          ? `repeat(2, 1fr)`
          : `repeat(1, 1fr)`,
        gap: Theme.space.$5
      }}
    >
      {children}
    </div>
  )
}
