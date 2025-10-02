import React, { useContext } from 'react';
import Layout from '../../components/layout/Layout';
import { datacontext } from '../../components/data provider/Dataprovider';
import { Rating } from '@mui/material';
import classes from '../cart/cart.module.css';
import { Link } from 'react-router-dom';
import { type } from '../../components/utilities/ActionType';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";


function Cart() {
  const [state,dispatch] = useContext(datacontext);



const total = state.basket.reduce((currentTotal, item) => {

             return item.price*item.amount+currentTotal
         }, 0)

const incriment=(item)=>{
  dispatch({
    type:type.ADD_TO_BASKET,item
  })

}

const decriment=(id)=>{
  dispatch({
    type:type.REMOVE_FROM_BASKET,id
  })

}





  return (
    <Layout>
      <div className={classes.holeCart}>
        <div  className={classes.cart}>
           <div className={classes.CartHeader}>
          <h2>HELLO</h2>
          <h3>Your shopping basket 🛒</h3>
        </div>
        <hr />
        <div className={classes.CartBody}>
          {state.basket.length === 0 ? (
            <h4>ooopss!!!! Your cart is empty.</h4>
          ) : (
            state.basket.map((item, index) => (
              <div key={item.id || index} className={classes.ProductList}>
                <div className={classes.ProductProduct}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={classes.ProductImage}
                  />

                  <div className={classes.ProductDetails}>
                    <h4>{item.title}</h4>
                    <h5>{item.description}</h5>

                    <div>
                      <Rating value={item.rating.rate} precision={0.1} readOnly />
                      <span>({item.rating.count} reviews)</span>
                    </div>

                    <div>
                      <p>Price: ${item.price}</p>
                    </div>
                  </div>
                </div>
                <div className={classes.ProductOptions}>
                  <button onClick={() => incriment(item)}>
                        <IoIosArrowUp />
                  </button>
                  <span>{item.amount}</span>
                  <button onClick={() => decriment(item.id)}>
                        <IoIosArrowDown />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        </div>
       
        <div className={classes.subtotal}>
          <div>
            <p>subtotal: ({state.basket.length} items)  ${total}</p>
          </div>
          <span>
            <input type="checkbox" />
            <small>This order contaiines a gift</small>
          </span>
          <div>
            <Link to="/payment">
            <button className={classes.Checkout}>continue to Checkout</button>
          </Link>
          </div>
          
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
