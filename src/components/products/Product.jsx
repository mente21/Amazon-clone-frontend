import React, { use, useContext } from 'react'
import axios from 'axios'
import { Rating } from '@mui/material';
import { useState,useEffect } from 'react'
import classes from './product.module.css'
import { Link } from 'react-router-dom';
import Loader from '../loder/Loder';
import {type} from '../utilities/ActionType'
 import {datacontext} from '../data provider/Dataprovider'





function ProductCatagories() {


const [state,dispatch]=useContext(datacontext);

  const addtocart = (item) => {
    dispatch({
      type: type.ADD_TO_BASKET,
      item: {
        image: item.image,
        title: item.title,
        price: item.price,
        description: item.description,
        category: item.category,
        rating: item.rating,
        count:item.rating.count,
        id: item.id,
    
      },
    });
  };




  const [Product, setproduct] = useState([]);
  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setproduct(response.data);
      })
  }, [])
  
 if (Product.length===0)  return <Loader /> ;
  return (
   <div className={classes.productList}>
      {Product.map((item) => (
        <div key={item.id} className={classes.productItem}>
           <Link to={`/products/${item.id}`}>
                       <img src={item.image} alt={item.title} className={classes.productImage} />

           </Link>

            <div>
                      <h4>{item.title}</h4>

            
                <div>
                     <Rating value={item.rating.rate} precision={0.1}/> 
                        <span>({item.rating.count} reviews)</span>  
               </div>
                   <div>
                    <p>Price: ${item.price}</p>

                    </div>
                    <div >
                        <button  className={classes.button} onClick={() => addtocart(item)}> <p>Add to Cart</p></button>
                    </div>
              </div>
        </div>
 
        
      ))}
    </div>
  )
}

export default ProductCatagories;
