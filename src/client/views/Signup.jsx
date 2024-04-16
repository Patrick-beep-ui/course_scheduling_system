import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Signup() {
    const [imgVisibility, setImgVisibility] = useState('hidden');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = async (formData) => {
        try {
            await axios.post("/login", formData);
            console.log("Login Successful");
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };
    
    return (
        <>
            
                <div className="form-container">
                    
                    <form onSubmit={handleSubmit(handleLogin)} className="form" id="login">
                        <div className="login-img" style={{ visibility: imgVisibility }}>
                            <img src="/img/login1.jpeg" alt=""/>
                        </div>
                        <div className="login-user" id="login-user">
                            <h1>Log In</h1>
                            <div className="form-group">
                                <input type="text" {...register("username", {required: true})}  id="username" placeholder="Username" />
                            </div>
                            <div className="form-group">
                                <input type="password" {...register("password", {required: true})}  id="user-password" placeholder="Password" />
                            </div>
                            <span className="btn-form" id="forgotpass-btn"><a href="">Forgot Password?</a></span>
                            <div className="form-group">
                                <button type="submit" className="btn-sign btn-buy" id="login-btn" >Login</button>
                            </div>
                            <span className="btn-form" id="sign-up-btn">Sign-Up</span>
                        </div>
                    </form>

                </div>
        </>
    );
}
