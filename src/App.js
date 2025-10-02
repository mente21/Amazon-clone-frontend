import { useEffect ,useContext} from 'react';
import './App.css';
import Router from './Router';

import { datacontext } from './components/data provider/Dataprovider';
import { auth } from './pages/firebase/firebase';
import { type } from './components/utilities/ActionType';


function App() {
const [{user},dispatch]=useContext(datacontext)
useEffect(()=>{
  auth.onAuthStateChanged((authUser)=>{
    if(authUser){
      dispatch(
        {type:type.SET_USER,
        user:authUser}
      )
    }else{
        dispatch(
        {type:type.SET_USER,
        user:null}
      )
    }
  })
} , [])


  return (
    <div>

   <Router />
    </div>
  )
}

export default App;
