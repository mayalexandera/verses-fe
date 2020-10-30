import React from 'react'
import { connect } from "react-redux";

const OrderItem = (props) => {
  let product_item = props.products.filter(product => product.id === props.order_item.product_id)


  return product_item !== undefined && product_item[0] !== undefined ? 
   (
    <>
      <div className='order-card-wrapper'>
        <hr id='order-hr'/>
        <div className='order-card'>
          <div className='order-card-thumbnail-wrapper'>
            <img
              alt={props.order.number}
              src={product_item[0].images.split(",")[0]}
            />
          </div>
          <div className='order-card-details'>
            <div className='order-item-info'>
              {"Delivered"}
              <p><strong>{product_item[0].name}</strong></p>
              <p>
                <span>Ordered:</span> {props.order.ordered_date}
              </p>
              <p>
                <span>Order</span>#{props.order.number}
              </p>
            </div>
          <div className='order-history-buttons'>
            <button onClick={() => console.log(props.order.id)} value={props.order.id}>
              View or Manage
            </button>
            <button
              onClick={() => console.log(product_item[0].product_type)}
              value={product_item[0].product_type}
              >
              Shop Similar
            </button>
          </div>
              </div>
        </div>
      </div>
      <hr id='order-hr' />
    </>
  ) : null
};

const mapStateToProps = (state) => {
  return {
    products: state.product.select,
    brands: state.brand.select,
  }
}



export default connect(mapStateToProps)(OrderItem);