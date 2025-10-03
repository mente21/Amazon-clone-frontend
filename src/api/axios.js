import axios from "axios"




const axiosInstance=axios.create({
   // baseURL:"http://127.0.0.1:5001/clone-22cc8/us-central1/api",
   baseURL:"https://amazon-clon-deploy.onrender.com",


});
export{axiosInstance}