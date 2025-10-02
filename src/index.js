import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {initialvalue,reducer} from './components/utilities/reducer'
import {Dataprovider} from './components/data provider/Dataprovider'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Dataprovider reducer={reducer} initialvalue={initialvalue} >
    <App />
  </Dataprovider>
);


