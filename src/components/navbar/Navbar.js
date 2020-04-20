import React from 'react';

const Navbar = ({ handleCartOpen }) => {
  return (
    <div>
      <button onClick={ handleCartOpen }>Cart</button>
    </div>
  )
};

export default Navbar;