import React from 'react'

export const ShopByBudgetWeb = ({data}: any) => {
  return (
    <div className="shopByBudgetWeb-container">
      <div className="shopByBudgetWeb">
        <div className="shopBudgetWeb-under">UNDER</div>
        <div className="shopBudgetWeb-price">{data.name}</div>
      </div>
    </div>
  )
}
