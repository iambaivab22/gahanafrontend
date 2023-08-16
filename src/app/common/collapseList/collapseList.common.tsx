import React, {useState, useRef, useLayoutEffect} from 'react'
import {IoIosArrowDown} from 'react-icons/io'

export const CollapseList = React.forwardRef<HTMLDivElement, Com.CollapseProps>(
  ({collapseData, iconVisible, ...rest}, ref) => {
    return (
      <div ref={ref} className="collapseContainer" {...rest}>
        {collapseData?.map((item, index) => {
          return (
            <div key={index}>
              <CollapseContent
                data={item}
                index={index}
                iconVisible={iconVisible}
              />
            </div>
          )
        })}
      </div>
    )
  },
)

export const CollapseContent = ({
  data,
  index,
  iconVisible = false,
}: {
  data: Com.CollapseData
  index: number
  iconVisible?: boolean
}) => {
  const [collapseHeight, setCollapseHeight] = useState<number>(0)
  const ref = useRef<HTMLDivElement | null>(null)
  const [selected, setSelected] = useState<any>(0)

  useLayoutEffect(() => {
    // @ts-ignore
    setCollapseHeight(ref?.current?.offsetHeight + 10)
  }, [ref?.current])

  const collapseHandler = (num: number) => {
    setSelected(selected === num ? null : num)
  }

  return (
    <div className="eachCollapse" key={index}>
      <div className="collapseTitle" onClick={() => collapseHandler(index)}>
        <div className="collapse-title-content">{data.title}</div>
        {iconVisible && (
          <div className="iconContainer">
            <IoIosArrowDown
              style={{
                rotate: selected === index ? '180deg' : '0deg',
                transition: '0.3s ease',
                width: '100%',
              }}
            />
          </div>
        )}
      </div>
      <div
        className="collapseContentContainer"
        style={{height: selected === index ? collapseHeight : '0px'}}
      >
        <div className="CollapseContent" ref={ref}>
          {data.content}
        </div>
      </div>
    </div>
  )
}
