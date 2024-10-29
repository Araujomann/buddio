import React from 'react'
import Masonry from 'react-masonry-css'

export const Gallery:React.FC<{ images: string[] }> = ({ images }) => {
    const breakpointColumnObj = {
        default: 5,
        1100: 3,
        700: 2,
    }

  return (
    <Masonry
    
    breakpointCols={breakpointColumnObj}
    className='flex -ml-4'
    columnClassName='pl-4 bg-clip-padding'
  

  >
    {images.map((image, index) => (
        <img key={index} src={image}  className="mb-4 w-full" />
    ))}
    
  </Masonry>
  )
}
