import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

export default function login(){

    const emailRef = useRef();
    const passwordRef = useRef();

    const {setUser, setToken} = useStateContext();

    const Submit =  (ev) =>{
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post("/login",payload).then(({data})=>{
            setUser(data.user);
            setToken(data.token);
    }).catch(err => {
        const response = err.response;
        if(response && response.status === 422){
            console.log(response.data.errors);
        }
    });
    }

    return(
        // <div className="login-signup-form animated fadeinDown">
        //     <div className="form">
        //         <h1 className="title">
        //             Login To Your Account
        //         </h1>
        //         <form onSubmit={Submit}>
        //         <input ref={emailRef} type="email" placeholder="Email" />
        //             <input ref={passwordRef} type="password" placeholder="Password" />
        //             <button className="btn btn-block">Login</button>
        //             <p className="message">
        //                 Not Registered? <Link to= '/register'>Create a new account</Link>
        //             </p>
        //         </form>
        //     </div>
        // </div>
        <form onSubmit={Submit} className="card w-96 shadow-2xl bg-base-100">
      <div className="card-body">
        <h2 className="text-center text-2xl font-bold">Login</h2>
        <div className="form-control">
          <label className="label"><span className="label-text">Email</span></label>
          <input ref={emailRef} type="email" placeholder="Email"  className="input input-bordered"/>
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text">Password</span> </label>
          <input ref={passwordRef} type="password" placeholder="Password"  className="input input-bordered"/>
        </div>

        <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
            Login
            </button>
        </div>

        <label className="label">
            <a href="/register" className="label-text-alt link link-hover">
              Register 
            </a>
        </label> 
      </div>
    </form>
    )
}