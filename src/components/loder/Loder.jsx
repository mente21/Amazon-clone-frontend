import React from 'react'
import{PuffLoader} from 'react-spinners'
import { ClipLoader } from "react-spinners";



function Loader() {
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",width:"100%",size:"50vh"}}>
      <PuffLoader color={"blue"} size={100} />
    </div>
  )
}

export default Loader