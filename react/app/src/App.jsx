import viteLogo from '/vite.svg'
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Template/js/home';
import Table from './Template/js/table';
import Layout from './Template/js/Layout';
import Humidi from './Template/js/Humid';
import Temp from './Template/js/Temp';
import Incid from './Template/js/Incident';
import Logout from './Template/js/Logout';


function App(){
    return (
        <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/Layout" element={<Layout />} >
                  <Route index element={<Table />} />
                  <Route path="humid" element={<Humidi />} />
                  <Route path="temp" element={<Temp/>} />
                  <Route path="incid" element={<Incid/>} />
               </Route>
        </Routes>
        )
    };
export default App;