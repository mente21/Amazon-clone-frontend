import React from 'react'
import catagory from './catagory'
import classes from './catagory.module.css'
import { Link } from 'react-router-dom'

function Catagory() {


    
  return (
 
 <div className={classes.Single_Catagory}>
     {catagory.map((item)=>(
       
            <Link to= {`/products/catagory/${item.name.toLowerCase()}`} className={classes.categoryItem} key={item.id}>
            <span>
                <h4>{item.name} </h4>
            </span>
            <img src={item.image} alt={item.name} />
            <p>shop now</p>

        </Link>

     ))}
      </div>


  )
}



export default Catagory