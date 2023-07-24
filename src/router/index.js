import React from 'react'
// import {Navigate} from 'react-router-dom'
import Home from '../components/Home'
import Login from '../components/Login'

const routers = [
    {
        path: '/home',
        element: <Home/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/',
        element: <Home/>
    }
]

export default routers