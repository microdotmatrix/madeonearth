import React from 'react'; 

const Thumbnails = ({ thumbnailImages,  }) => {
  return (
    <div className='thumbnail'> 
      <img 
        src={ thumbnailImages }
      />
    </div>
  )
}

export default Thumbnails;