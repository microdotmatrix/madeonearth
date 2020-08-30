import React from 'react'; 
import './Thumbnails.css';


const Thumbnails = ({ thumbnailImages, handleThumbnailSelection }) => {
  return (
    <div className='thumbnailContent'> 
      <img 
        src={ thumbnailImages }
        alt={ `Product thumbnail` } 
      />
    </div>
  )
}

export default Thumbnails;