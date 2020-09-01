import React from 'react'; 
import './Thumbnails.css';


const Thumbnails = ({ thumbnailImages, handleThumbnailSelection }) => {
  return (
    <div className='productThumbnails'> 
      <img 
        src={ thumbnailImages }
        alt={ `Product thumbnail` } 
      />
    </div>
  )
}

export default Thumbnails;