import React from 'react';

const ProductDetail = ({ product }) => {
  console.log(product)
  // const { product } = this.state
  // console.log(product)
  // let variantQuantity = 1
  // let productAvailability = product.availableForSale
  // let productDescription = product.description
  let productImage = product.images[0]
  // let productVariant = this.state.selectedVariant
  let productPrice = product.variants[0].price
  // return (
  //   <>
  //     <div>
  //       <img 
  //         src={ productImage.src } 
  //         alt={ `${this.props.product.title} product shot` } 
  //         onClick={ this.handleModalOpen } 
  //       /> 
  //     </div>
      
  //     <div>
  //       <h1 className='productTitle'>{ this.props.product.title }</h1>
  //       <span className='productPrice'>${ Math.trunc(productPrice) }</span>
  //       { productDescription === "" ? null : <div className='productDescription'>{ productDescription }</div> }
  //       <div className='productBtn'>
  //         { this.variantSelector() }
  //       </div>

  //       { productAvailability === false ? 
  //           <div className='btnDisable' >Sold Out</div>
  //         : productVariant !== undefined ?
  //           <button className='addToCart' onClick={ () => this.props.addVariantToCart(productVariant.id, variantQuantity) } >Add to Cart</button>
  //         : <button className='addToCart'>Add to Cart</button>
  //       }

  //     </div>
  //   </>
  // )

  return (
    <div>

    </div>
  )
};

export default ProductDetail;