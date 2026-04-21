import React from 'react'
import MainCaroselData from './MainCaroselData'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

// Responsive settings
const responsive = {
  0: { items: 1 },
  568: { items: 1 },
  1024: { items: 1 },
}

const MainCarosel = () => {

  const items = MainCaroselData.map((item, index) => (
    <img
      key={index}
      src={item.image}
      alt="carousel"
      className="w-full h-[500px] object-cover"
      onError={(e) => {
        e.target.src = "https://via.placeholder.com/1200x500?text=Image+Not+Found"
      }}
    />
  ))

  return (
    <div className="w-full">
      <AliceCarousel
        items={items}
        responsive={responsive}
        mouseTracking
        autoPlay
        autoPlayInterval={3000}
        infinite
        disableDotsControls
        disableButtonsControls
      />
    </div>
  )
}

export default MainCarosel