import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom';
import '../css/Side.css';

function Layout() {
  return (
    <div>
        <div className='back flex'>
            <Sidebar/>
            <div className='layo w-full ml-18 md:ml-59'>
                <Outlet />
            </div>
        </div>
    </div>
  );
};

export default Layout;