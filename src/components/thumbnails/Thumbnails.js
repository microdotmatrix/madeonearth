import React from 'react'; 


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