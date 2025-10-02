import React from 'react'
import Layout from '../../components/layout/Layout'
import classes from './signin.module.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import img from './png.png'
import {auth} from '../firebase/firebase'
import { useState,useContext } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { datacontext } from '../../components/data provider/Dataprovider'
import { type } from '../../components/utilities/ActionType'
import { ClipLoader } from "react-spinners";
import { useLocation } from 'react-router-dom'




function Signin() {

  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [error,seterror]=useState("");
  const [loading,setloading]=useState({
      signin:false,
       signup:false
  }
  
  )

  const navigate=useNavigate();
  const NavstateData=useLocation()
  console.log(NavstateData)
  const [{user},dispatch]=useContext(datacontext)
  console.log(user);



const eventhandler = async (e) => {
  e.preventDefault();

  if (e.target.name === "signin") {
    setloading({ ...loading, signin: true });

    signInWithEmailAndPassword(auth, email, password)
      .then((userInfo) => {
        dispatch({
          type: type.SET_USER,
          user: userInfo.user,
        });
      })
      .catch((err) => {
        seterror(err.message);
      })
      .finally(() => {
        setloading({ ...loading, signin: false });
        navigate(NavstateData?.state?.redirect || "/")
      });

  } else {
    setloading({ ...loading, signup: true });

    createUserWithEmailAndPassword(auth, email, password)
      .then((userInfo) => {
        dispatch({
          type: type.SET_USER,
          user: userInfo.user,
        });
      })
      .catch((err) => {
        seterror(err.message);
      })
      .finally(() => {
        setloading({ ...loading, signup: false });
                navigate(NavstateData?.state?.redirect || "/")


      });
  }
};


  return (

<div className={classes.hole}>


<div className={classes.main}>
  <Link to={"/"} className={classes.image}>
                  <img src={img} alt="Logo" />
  </Link>
  <div className={classes.Signinp}>
    <h2>Sign-in</h2>

    <p style={{ color:"red", justifyContent:"center"}}>{NavstateData?.state?.msg}</p>

    <div className={classes.input}>
      <label for="email">Email</label><br></br>
      <input   value={email}  onChange={(e)=>setemail(e.target.value)}  type="email" name='Email' /><br></br>
      <label for="password">Password</label><br></br>
      <input  value={password}  onChange={(e)=>setpassword(e.target.value)}     type="password" name='Password' />
    </div>
    <span >
      
      <button   type='submit'  name='signin' className={classes.signinbutton}  onClick={eventhandler} >
      {loading.signin?(<ClipLoader color="#000"  size={15}/>):("sign in")}
        
      </button>
    </span>
    <h5>by sign-in you are agree to AMAZON FAKE-CLONE conditions of use &sale. please see our privacy notice our cookies notice and our interest.Based Add notice</h5>
    <span >
      <button  type='button'  name='signup'    onClick={eventhandler}     className={classes.creatbutton}>
      {loading.signup?(<ClipLoader color="#000"  size={15}/>):("creat your amazon account")}
        </button>
      <small style={{color:"red",paddingTop:"20px"}}>{error}</small>
      </span>
  </div>
</div>

</div>
    
  )
}

export default Signin;