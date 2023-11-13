import React from "react"
import { Navigate } from "react-router-dom"

const PrivateRoute = (props) => {
    const { children } = props
    return localStorage.getItem('token') ? children : <Navigate to='/' />
}

export default PrivateRoute