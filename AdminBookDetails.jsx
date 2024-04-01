import React, { useState ,useEffect} from "react";
import "./AdminDashboard.css"; // Import CSS styles for the component
import customer1 from '../../assets/customer01.jpg'
import customer2 from '../../assets/customer02.jpg'
import { CiLogout } from "react-icons/ci";
import { IoBookSharp } from "react-icons/io5";
import { GoAlertFill } from "react-icons/go";
import { HiMiniBellAlert } from "react-icons/hi2";
import {Form, Link , useNavigate} from 'react-router-dom'
import axios from 'axios'
const AdminBookDetails = () => {
  
    //   data add t obackend
    const [email , setEmail] = useState("");
const [title , setTitle] = useState("");
const [author , setAuthor] = useState("");
const [country , setCountry] = useState("");
const [language , setLanguage] = useState("");
const [year , setYear] = useState("");
const [status , setStatus] = useState("");
const [statusDate, setStatusDate] = useState('');
const [statusTime, setStatusTime] = useState('');
  const navigate = useNavigate();

  

//  sending book details
const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;
        const formattedTime = `${("0" + currentDate.getHours()).slice(-2)}:${("0" + currentDate.getMinutes()).slice(-2)}:${("0" + currentDate.getSeconds()).slice(-2)}`;
        try {
            const response = await axios.post('http://localhost:4556/bookdetails', {
                email,
                title,
                author,
                country,
                language,
                year,
                status,
                statusDate: formattedDate,
                statusTime: formattedTime
            });
            console.log(response.data);
            if (response.data.code === 200) {
                navigate('/admin/student');
                alert('Book added successfully.');
            } else {
                alert('Error adding book.');
            }
        } catch (error) {
            console.error('Error adding book:', error);
            alert('Internal Server Error.');
        }
    };


  return (
    <div className="container">
      <div className="navigation">
        <ul>
          <li>
            <a href="#">
              <span className="icon">
                <IoBookSharp
                  size={30}
                  color="#2a2185"
                  style={{ position: "relative", top: "17px", left: "30px" }}
                />
              </span>
              <span className="title">
                <h1 style={{ fontSize: "25px" }}>Admin</h1>
              </span>
            </a>
          </li>
          <li>
           < Link to="/admin">
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="title">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/student">
              <span className="icon">
                <ion-icon name="people-outline"></ion-icon>
              </span>
              <span className="title">Students</span>
            </Link>
          </li>
          <li>
            <Link  to="/admin/attendence">
              <span className="icon">
                <ion-icon name="chatbubble-outline"></ion-icon>
              </span>
              <span className="title">Attendence</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/books">
              <span className="icon">
                <ion-icon name="people-outline"></ion-icon>
              </span>
              <span className="title">Books</span>
            </Link>
          </li>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <li>
            <Link to="/">
              <span className="icon">
                <ion-icon name="log-out-outline"></ion-icon>
              </span>
              <span className="title">Sign Out</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="main">
        <div className="topbar">
          <div className="search">
            <label>
              <input type="text" placeholder="Search here" />
              <ion-icon name="search-outline"></ion-icon>
            </label>
          </div>
          <div
            className="flex-none"
            style={{ position: "absolute", left: "77%" }}
          >
            
          </div>
          <div className="dropdown dropdown-end" style={{position:'relative',left:'-12%'}}>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <Link to='/student' className="justify-between">
            Profile
            
          </Link>
        </li>
        <li><Link to ='/'>Logout</Link></li>
      </ul>
    </div>
        </div>

        <div className="cardBox">
          <div className="card">
            <div>
              <div className="numbers">1000</div>
              <div className="cardName">Students</div>
            </div>
            <div className="iconBx">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
          </div>
          <div className="card">
            <div>
              <div className="numbers">2200</div>
              <div className="cardName">Books</div>
            </div>
            <div className="iconBx">
              <ion-icon name="cart-outline"></ion-icon>
            </div>
          </div>
          <div className="card">
            <div>
              <div className="numbers">5</div>
              <div className="cardName">Today Issued Books </div>
            </div>
            <div className="iconBx"></div>
          </div>
          <div className="card">
            <div>
              <div className="numbers">11</div>
              <div className="cardName">Todays Students</div>
            </div>
            <div className="iconBx">
              <ion-icon name="cash-outline"></ion-icon>
            </div>
          </div>
        </div>

        <div className="details">
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Add Book</h2>
              
            </div>

            <div style={{position:'relative',top:'-40px',left:'20%'}}>
						<form className="form_container" onSubmit={handleSubmit}>
                        <input
								type="text"
								placeholder="Email"
								name="email"
								onChange={(e)=>{
								setEmail(e.target.value)
								}}
								value={email}
								required
								className="input"
							/>
							{/* // name */}
							<input
								type="text"
								placeholder=" title"
								name="title"
								onChange={(e)=>{
								setTitle(e.target.value)
								}}
								value={title}
								required
								className="input"
							/>
							{/* University No */}
							<input
								type="text"
								placeholder="author"
								name="author"
								onChange={(e)=>{setAuthor(e.target.value)}}
								value={author}
								required
								className="input"
							/>
							{/* department */}
							<input
								type="text"
								placeholder="country"
								name="country"
								onChange={(e)=>{setCountry(e.target.value)}}
								value={country}
								required
								className="input"
							/>
							{/* contact no */}
							<input
								type="text"
								placeholder="Language"
								name="language"
								onChange={(e)=>{setLanguage(e.target.value)}}
								value={language}
								required
								className="input"
							/>
							{/* email */}
							<input
								type="text"
								placeholder="Year"
								name="Year"
								onChange={(e)=>{setYear(e.target.value)}}
								value={year}
								required
								className="input"
							/>
                            <select className="input" name="status" id="status" value={status} onChange={(e)=>{setStatus(e.target.value)}}>
                            <option >Student Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Return">Return</option>
                            </select>

							<button type="submit" className="btn">
								Add Book
							</button>
						</form>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookDetails;
