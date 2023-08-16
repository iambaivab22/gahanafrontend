import {HStack} from 'src/app/common'
import {useMedia} from 'src/hooks'

export const KeyValueTable = ({details, repeat}: Comp.KeyValueTableProps) => {
  const media = useMedia()

  return (
    <HStack className="keyValueTable-container">
      <div
        className="keyValueTable"
        style={{
          gridTemplateColumns: media.md
            ? `repeat(${repeat}, 1fr)`
            : media.sm
            ? `repeat(2,1fr)`
            : `repeat(1,1fr)`
        }}
      >
        {details.map((item: Comp.KeyValueTableItems, index: number) => {
          return (
            <div className="keyValueTable-eachitem" key={index}>
              <span className="itemtitle">{item.name}: </span>{' '}
              {item.name === 'website' ? (
                <span className="website">
                  <a href={String(item.value)}>{item.value}</a>
                </span>
              ) : (
                <span className="common">{item.value}</span>
              )}
            </div>
          )
        })}
      </div>
    </HStack>
  )
}
