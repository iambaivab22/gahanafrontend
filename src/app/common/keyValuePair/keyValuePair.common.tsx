import React from 'react'
import {HStack, VStack} from '../stack'

export const KeyValuePair = <T, K extends keyof T>({
  data
}: Com.KeyValuePairProps<T>) => {
  return (
    <div className="keyValue-container">
      <VStack className="keyValue">
        {Object.keys(Object(data)).map((key, index) => {
          if (data[String(key) as K]) {
            return (
              <HStack align={'end'} key={index}>
                <div className="keyValue-key">
                  {key.charAt(0).toUpperCase() + key.slice(1)} :
                </div>
                <div className="keyValue-value">
                  {data[String(key) as K] as React.ReactNode}
                </div>
              </HStack>
            )
          }
        })}
      </VStack>
    </div>
  )
}
