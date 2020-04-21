import React from 'react';

const Navbar = (props) => {
  return (
    <div>
      <button onClick={ props.handleCartOpen }>Cart</button>
    </div>
  )
};

export default Navbar;