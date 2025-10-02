import React, { use } from 'react'
import axios from 'axios'
import { Rating } from '@mui/material';
import { useState,useEffect , useContext } from 'react'
// import classes from '../../components/products/product.module.css'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout'
import classes from './result.module.css'
import Loader from '../../components/loder/Loder';
import { datacontext } from '../../components/data provider/Dataprovider';
import { type } from '../../components/utilities/ActionType';

function Resultskey() {


   const {categoryName}=useParams();
  const [Product, setproduct] = useState([]);
const [state,dispatch]=useContext(datacontext);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setproduct(response.data);
      })
  }, [])


   if (Product.length===0) return  <Loader /> ;



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
<div className={classes.resultheader}>
  <h2 >Results</h2>

  <div>catagory/ <p>{categoryName}</p></div>
</div>


   <div className={classes.productList} > 
      {Product.filter(Product => Product.category===categoryName).map((item) => (
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
                        <button  className={classes.button}  onClick={() => addtocart(item)}> <p>Add to Cart</p></button>
                    </div>
              </div>
        </div>
 
        
      ))}
    </div>

     </Layout>
  )

}
export default Resultskey