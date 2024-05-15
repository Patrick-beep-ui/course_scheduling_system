import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Login() {
    const [imgVisibility, setImgVisibility] = useState('hidden');
    const [isLoginForm, setIsLoginForm] = useState(true); // State to track whether login form is active
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsLoginForm(!isLoginForm); // Toggle between login and signup forms
    };

    const handleSignUp = async (formData) => {
        try {
            const response = await axios.post('/signup', formData);
            console.log(response.data);
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    const handleLogin = async (formData) => {
        try {
            await axios.post("/login", formData);
            console.log("Login Successful");
            navigate('/');
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    const logoutUser = async () => {
       try {
        const response = await axios.post('logout');
        console.log('Logout Successful', response);
       }
       catch(error) {
        console.error(error.response?.data || error.message);
       }
    };

    return (
        <div className="form-container">
            <form onSubmit={isLoginForm ? handleSubmit(handleLogin) : handleSubmit(handleSignUp)} className="form">
                {/* Conditional rendering based on whether it's login or signup form */}
                {isLoginForm ? (
                    <>
                        <div className="login-img" style={{ visibility: imgVisibility }}>
                            <img src="/img/login1.jpeg" alt=""/>
                        </div>
                        <div className="login-user" id="login-user">
                            <h1>Log In</h1>
                            <div className="form-group">
                                <input type="text" {...register("username", {required: true})} id="username" placeholder="Username" />
                            </div>
                            <div className="form-group">
                                <input type="password" {...register("password", {required: true})} id="user-password" placeholder="Password" />
                            </div>
                            <span className="btn-form" id="forgotpass-btn"><a href="">Forgot Password?</a></span>
                            <div className="form-group">
                                <button type="submit" className="btn-sign btn-buy" id="login-btn" >Login</button>
                            </div>
                            <span className="btn-form" id="sign-up-btn" onClick={toggleForm}>Sign-Up</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="login-user" id="signup-user">
                            <h1>Sign-Up</h1>
                            <div className="form-group">
                                <input type="text" {...register("first_name", {required: true})} id="first_name" placeholder="First Name" />
                            </div>
                            <div className="form-group">
                                <input type="text" {...register("last_name", {required: true})} id="last_name" placeholder="Last Name" />
                            </div>
                            <div className="form-group">
                                <input type="text" {...register("username", {required: true})} id="username" placeholder="Username" />
                            </div>
                            <div className="form-group">
                                <input type="email" {...register("email", {required: true})} id="new-user-email" placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <input type="password" {...register("password", {required: true})} id="new-user-password" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn-sign btn-buy" id="signup-btn">Sign-Up</button>
                            </div>
                            <span className="btn-form" id="login-btn" onClick={toggleForm}>Login</span>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}
