import React, { useEffect } from 'react'
import {useRoutes,useLocation,useNavigate} from "react-router-dom"
import routes from "./router"
import 'antd/dist/antd.css';
import {message} from "antd"
// import logo from './logo.svg';
import './App.css';


function ToLogin() {
  const navigateTo = useNavigate()
  useEffect(()=>{
    navigateTo("/login");

  })
  return <div></div>
}

function Topage() {
  const navigateTo = useNavigate()
  useEffect(()=>{
    navigateTo("/home")
    message.success("Successfully logged in!")
  })
  return <div></div>
}

function BeforeRouteEnter() {
  const outlet = useRoutes(routes)

  const location = useLocation()
  let user_data = localStorage.getItem("__google_user_data__");


  if(location.pathname === "/login" && user_data ) {
    return <Topage />
  }

  if(location.pathname !== "/login" && !user_data) {
    return <ToLogin />
  }

  return outlet
}

function App() {
  return (
    <div className='bg-blue-300 w-screen h-screen'>
         <React.Suspense fallback={<div>Loading...</div>}>
           <BeforeRouteEnter/>
         </React.Suspense>
    </div>
  );
}

export default App;
