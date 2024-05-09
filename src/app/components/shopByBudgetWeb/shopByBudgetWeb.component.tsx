import React from 'react'
import {useNavigate} from 'react-router-dom'
import {getNprPrice} from 'src/helpers/nprPrice.helper'

export const ShopByBudgetWeb = ({data}: any) => {
  const navigate = useNavigate()
  return (
    <div
      className="shopByBudgetWeb-container"
      onClick={() => {
        navigate(`/products?maxPrice=${data.name}`)
      }}
    >
      <div className="shopByBudgetWeb">
        <div className="shopBudgetWeb-under">UNDER</div>
        <div className="shopBudgetWeb-price">{getNprPrice(data?.name)}</div>
      </div>
    </div>
  )
}
