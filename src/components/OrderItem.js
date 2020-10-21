import React from 'react'

const OrderItem = (props) => {
  return props.product_item && props.product_item ? 
   (
    <>
      <div className='order-card-wrapper'>
        <hr id='order-hr'/>
        <div className='order-card'>
          <div className='order-card-thumbnail-wrapper'>
            <img
              alt={props.order.number}
              src={props.product_item[0].images.split(",")[0]}
            />
          </div>
          <div className='order-card-details'>
            {"Delivered"}
            <p>{props.product_item[0].name}</p>
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
              onClick={() => console.log(props.product_item[0].product_type)}
              value={props.product_item[0].product_type}
            >
              Shop Similar
            </button>
          </div>
        </div>
      </div>
      <hr id='order-hr' />
    </>
  ) : null
};



export default OrderItem;