import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import '../App.css';

export default function DefaultLayout(){

    const {user, token, setUser, setToken} = useStateContext();
    if(!token){
       return <Navigate to='/login'/>
    }
    
    const onLogout =  (ev) =>{
        ev.preventDefault();
        axiosClient.get('/logout')
        .then(({}) => {
           setUser(null)
           setToken(null)
        })
    }

    useEffect(() => {
        axiosClient.get('/user')
          .then(({data}) => {
             setUser(data)
          })
      }, [])
    
    return(
        <div>
            <header>
            <div className="navbar bg-base-100 w-full fixed top-0 left-0">
            <div className="navbar-start">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li><a>Data Penjualan</a></li>
                
            </ul>
            </div>
            <a className="btn btn-ghost text-xl">Penjualan</a>
        </div>
        <div className="navbar-end">
            <ul className="menu menu-horizontal px-1">
                <li><a>Link</a></li>
            </ul>
            <a href="#" onClick={onLogout} className="btn"> Logout</a>
        </div>
        
            </div>
            </header>
            <main>
            <Outlet />
            </main>
        </div>
    )
}