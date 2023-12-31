import React from 'react'

export function withDefaultSpacingProps<T>(
  Component: React.ComponentType<any>,
) {
  return function render(
    props: Omit<T & Com.PaddingParams, 'margin' | 'padding'>,
  ) {
    const {p = 0, pl, pr, pt, pb, m = 0, ml, mr, mt, mb, style} = props
    const paddingObject = {
      pl: pl ?? p,
      pr: pr ?? p,
      pt: pt ?? p,
      pb: pb ?? p,
    }
    const marginObject = {ml: ml ?? m, mr: mr ?? m, mt: mt ?? m, mb: mb ?? m}

    const padding = `${paddingObject.pt}px ${paddingObject.pr}px ${paddingObject.pb}px ${paddingObject.pl}px`
    const margin = `${marginObject.mt}px ${marginObject.mr}px ${marginObject.mb}px ${marginObject.ml}px`

    const newStyle = {
      padding,
      margin,
      ...style,
    }

    return <Component style={newStyle} {...props} />
  }
}
