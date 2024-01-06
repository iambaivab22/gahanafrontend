import React from 'react'

export const CategorryContainer = () => {
  return (
    <div className="CategoryContainer">
      {[1, 2, 3, 4, 5, 6, 7].map((item: any, index: number) => {
        return (
          <div className="categoryCont">
            <div className="categoryImageContainer">
              <div className="categoryImage">
                <div className="categoryImage-image">
                  <img src="src/assets/images/banner1.webp"></img>
                </div>
              </div>
            </div>

            <div className="categoryImage-title">New arrivals</div>
          </div>
        )
      })}
    </div>
  )
}
