import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import img from './image/data';
import classes from './cursole.module.css'

function Cursole() {
  return (
    <div className={classes.container}>
        <Carousel 
        autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={2000} showIndicators={false}>
        {img.map((item)=>(
            <div><img src={item} alt="" /></div>))}
            </ Carousel>
    </div>
  )
}

export default Cursole