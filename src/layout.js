import React, {useEffect, useState} from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
// import Home from './Home';
import Menu from "./Menu";
import './assets/styles/animation.css'

const Layout = () => {
  const location =  useLocation()
  const [menuKey, setMenuKey] = useState(1);
  const [direction, setDirection] = useState(false)
  useEffect(() => {
    console.log('location', location);      

  }, [location])

  const handleChangeMenu = (key, onResolve) => {
    setDirection(key > menuKey)
    setMenuKey(key)
    onResolve()
  }
  return (
    <div style={{ width: "100%", height: "100%"}} className="flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <SwitchTransition>
        <CSSTransition key={location.pathname} timeout={300} classNames={direction? 'layout-slide-right' : 'layout-slide-left'}>
          <Outlet />
      </CSSTransition>
      </SwitchTransition>
      </div>
      <Menu onChangeMenu={handleChangeMenu}/>
    </div>
  );
};

export default Layout;
