import React from 'react'
import {useNavigate} from 'react-router-dom'

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
        <div className="shopBudgetWeb-price">{data.name}</div>
      </div>
    </div>
  )
}
