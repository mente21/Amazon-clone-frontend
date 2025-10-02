import React, { useState, useEffect, useContext } from 'react';
import Layout from '../../components/layout/Layout';
import classes from './Productdetail.module.css';
import axios from 'axios';
import { Rating } from '@mui/material';
import { useParams } from 'react-router-dom';
import Loader from '../../components/loder/Loder';
import { datacontext } from '../../components/data provider/Dataprovider';

import { type } from '../../components/utilities/ActionType';



function ProductDetailKey() {
  const [item,setitem] = useState(null);
  const { id } = useParams();
  const [state,dispatch]=useContext(datacontext);
  

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        setitem(response.data);
        console.log(response.data);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!item) return  <Loader /> ;

  const addtocart = (item) => {
    dispatch({
      type: type.ADD_TO_BASKET,
      item: {
        image: item.image,
        title: item.title,
        price: item.price,
        catagory: item.catagory,
        description: item.description,
        category: item.category,
        rating: item.rating,
        count:item.rating.count,
        id: item.id,
    
      },
    });
  };







  return (
    <Layout>
      <div className={classes.ProductList}>
        <div key={item.id} className={classes.ProductProduct}>
          <img src={item.image} alt={item.title} className={classes.ProductImage} />

          <div className={classes.ProductDetails}>
            <h4>{item.title}</h4>
                      <h5>{item.description}</h5>

            <div>
              <Rating value={item.rating.rate} precision={0.1} />
              <span>({item.rating.count} reviews)</span>
            </div>
            <div>
              <p>Price: ${item.price}</p>
            </div>
            <div className={classes.buttonWrapper}>
              <button className={classes.button} onClick={() => addtocart(item)}><p>Add to Cart</p></button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetailKey;
