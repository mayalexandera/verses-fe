import React from 'react'
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";


class OrderForm extends React.Component {

//   find_item_price = (item) => {
//     return this.props.products.filter(product => product.id === item.product_id)
//   }

//   calculateOrder = () => {

//        item.product_id === product.id

//       total += product.price
     
//     })
//     });
//     console.log(total);
    
//   return total
// }


//   render() {
//     return (
//       <div id='span-3-of-9' id='order-form-container'>
//         <div className='order-info'>
//           {this.calculateOrder()}
//         </div>
//       </div>
//     );
//   }
}

const mapStateToProps = (state) => {
  return {
    cart_items: state.cart.cart_items,
    products: state.product.select
  }
}


export default connect(mapStateToProps)(OrderForm)