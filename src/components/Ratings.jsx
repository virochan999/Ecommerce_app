import React, { useState } from 'react'
import Star from './Star';

const Ratings = ({productRating}) => {
  const [rating, setRating] = useState(productRating)
  const threshold = 5
  const ratingView = () => {
    const roundedRating = Math.floor(rating)
    const stars = [];

    for(let i = 1; i<= roundedRating; i++) {
      stars.push(<Star key={i} filled />)
    }

    for (let i = stars.length + 1; i <= threshold; i++) {
      stars.push(<Star key={i}  />);
    }

    return stars;
  }

  return (
    <>
      <div className='font-bold'>Ratings: 
        <span className='flex'>
          {ratingView()}
        </span>
      </div>
    </>
  )
}

export default Ratings