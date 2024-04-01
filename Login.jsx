import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import "./Login.css";
import Header from "../Header.jsx";

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [loginDate, setLoginDate] = useState('');
    const [loginTime, setLoginTime] = useState('');
     
  
    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;
        const formattedTime = `${("0" + currentDate.getHours()).slice(-2)}:${("0" + currentDate.getMinutes()).slice(-2)}:${("0" + currentDate.getSeconds()).slice(-2)}`;
        setLoginDate(formattedDate);
        setLoginTime(formattedTime);
    
        axios.post('http://localhost:4556/signin', {
            email: email,
            password: password,
            role: role,
            loginDate: formattedDate, // Include loginDate from state
            loginTime: formattedTime // Include loginTime from state
        })
        .then(res => {
            console.log(res.data)
    
            if (res.data.code === 500) {
                alert('User Not Found')
            }
            if (res.data.code === 404) {
                alert('Password is wrong')
            }
            if (res.data.code === 200) {
                
                // move to home
                if (role === "Student") {
                    navigate('/student', { state: { email: res.data.user.email } });
                }
                else if (role === 'Admin') {
                    navigate('/admin',{state:{email:res.data.user.email , role:res.data.user.role , password:res.data.user.password}});
                }
                else {
                    alert("User not found")
                }
              
                localStorage.setItem('TOKEN', res.data.token)
                localStorage.setItem('EMAIL', res.data.email)
            }
        }).catch(err => {
            console.log("front errro=======" ,err)
        });
    
    }
      
    return (
        <>
            <Header />
            <div className="login_container" style={{ background: "#F2FEFF" }}>
                <div className="login_form_container">
                    <div className="left">
                        <form className="form_container" onSubmit={handleSubmit}>
                            <h1>Login to Your Account</h1>
                            <h4>Using Email and Password</h4>

                            <select className="input" name="role" id="role" value={role} onChange={(e) => { setRole(e.target.value) }}>
                                <option disabled>Select an option</option>
                                <option value="Student">Student</option>
                                <option value="Admin">Admin</option>
                            </select>

                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                required
                                className="input"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                required
                                className="input"
                            />

                            <button type="submit" className="green_btn">
                                Sign In
                            </button>

                            <Link style={{ color: "red" }} to={'/forget-pass'}> Forget Password </Link>

                            <p>OR</p>
                            <p>Login Using Scanner ? <Link to="/">Sign In</Link></p>
                        </form>
                    </div>
                    <div className="right">
                        <h1>New Here ?</h1>
                        <Link to="/signup">
                            <button type="button" className="white_btn">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <ToastContainer /> {/* Place ToastContainer outside main content */}
        </>
    );
};

export default Login;
