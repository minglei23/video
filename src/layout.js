import React from 'react';
import {Outlet} from 'react-router-dom'
// import Home from './Home';
import Menu from "./Menu";

const Layout = () => {
  return (
    <div style={{width:'100%',height:'100%'}}>
        <Outlet/>
        <Menu />
    </div>
  )
}

export default Layout;
