import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

export default function register(){

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const {setUser, setToken} = useStateContext();

    const Submit =  (ev) =>{
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post("/register",payload).then(({data})=>{
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
        <form onSubmit={Submit} className="card w-96 shadow-2xl bg-base-100">
            <div className="card-body">
                <h2 className="text-center text-2xl font-bold">Register</h2>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Nama</span>
                    </label>
                    
                    <input ref={nameRef} type="name" placeholder="Masukkan nama" className="input input-bordered"/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input ref={emailRef} type="email" placeholder="Masukkan email" className="input input-bordered"/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span> 
                    </label>
                    <input ref={passwordRef} type="password" placeholder="Masukkan password" className="input input-bordered"/>
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary w-full">
                    Register
                    </button>
                </div>
                <label className="label">
                    <a href="/login" className="label-text-alt link link-hover">
                    Login 
                    </a>
                </label>
            </div>
        </form>
    )
}