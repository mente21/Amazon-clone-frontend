import React from 'react'
import { IoMenu } from "react-icons/io5";
import classes from '../header/Lowerheader.module.css'

 function Lowerheader() {
  return (
       <div className={classes.container}>
      <ul className={classes.list}>
        <li className={classes.first}>{<IoMenu />} <p>All</p></li>
        <li>today's deal</li>
        <li>customer service</li>
        <li>registry</li>
        <li>gift cards</li>
        <li>sell</li>
      </ul>
    </div>

  )
}
export default Lowerheader;