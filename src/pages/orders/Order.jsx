import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { db } from '../firebase/firebase'
import { datacontext } from '../../components/data provider/Dataprovider'
import classes from '../orders/order.module.css'
import { Rating } from '@mui/material'

function Orderkey() {
  const [{ user }] = useContext(datacontext);
  const [orders, setorders] = useState([]);

  useEffect(() => {
    if (user) {
      return db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setorders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        });
    } else {
      setorders([]);
    }
  }, [user]);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.items}>
          <h2>Your orders</h2>

{
  orders?.length===0 && <div style={{padding:"20px"}}>you don't have orders yet</div>
}

          <div>

            {orders?.map((eachorder, id) => {
              return (
                <div key={id}>
                  <p>Order ID: {eachorder?.id}</p>

                  {eachorder?.data?.basket?.map((item) => {
                    return (
                      <div key={item.id} className={classes.ProductList}>
                        <div className={classes.ProductProduct}>
                          <img
                            src={item.image}
                            alt={item.title}
                            className={classes.ProductImage}
                          />

                          <div className={classes.ProductDetails}>
                            <h4>{item.title}</h4>
                            <div>
                              <Rating
                                value={item.rating.rate}
                                precision={0.1}
                                readOnly
                              />
                              <span>({item.rating.count} reviews)</span>
                            </div>

                            <div>
                              <p>Price: ${item.price}</p>
                            </div>
                          </div>
                        </div>
                 
                      </div>
                      
                    )
                    
                  }
              
                  
                  )}
                  <hr />               </div>
            
              )
                              
                             
                         
            })}
          </div>
                              

        </div>
      </section>
    </Layout>
  )
}

export default Orderkey
