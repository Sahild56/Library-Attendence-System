import React ,{useState ,useEffect} from "react";
import "./StudentDashboard.css";
import customer1 from '../../assets/customer01.jpg'
import customer2 from '../../assets/customer02.jpg'
import { CiLogout } from "react-icons/ci";
import { IoBookSharp } from "react-icons/io5";
import { GoAlertFill } from "react-icons/go";
import { HiMiniBellAlert } from "react-icons/hi2";
import axios from 'axios'
import {Link} from 'react-router-dom'
const StudentAttendence = () => {
  const [userData , setUserData] = useState({});
  const userEmail = 'tanu1@gmail.com'


  useEffect(()=>{
    const fetchUser = async () => {
      try {
        let response = await axios.get(`http://localhost:4556/userdata/${userEmail}`);
        setUserData(response.data);
      } catch (err) {
        console.log('Error', err);
      }
    };
    fetchUser();
  },[userData]);


  return (
    <div className="container" >
      <div className="navigation">
        <ul>
          <li>
            <a href="#">
              <span className="icon">
              <IoBookSharp size={30} color='#2a2185' style={{position:'relative',top:'17px',left:'30px'}} />
              </span>
              <span className="title"><h1 style={{fontSize:'25px'}}>Student</h1></span>
            </a>
          </li>
          <li>
            <Link  to="/student">
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="title">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to='/student/attendence' >
              <span className="icon">
                <ion-icon name="people-outline"></ion-icon>
              </span>
              <span className="title">Attendence</span>
            </Link>
          </li>
          <li>
            <Link to="/student/books">
              <span className="icon">
                <ion-icon name="chatbubble-outline"></ion-icon>
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
          <div className="flex-none" style={{position:'absolute',left:'77%'}}>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
        <HiMiniBellAlert  size={30} color="rgba(113, 99, 186, 255)"/>
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </div>
      <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="font-bold text-lg">8 Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
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
              <div className="numbers">1</div>
              <div className="cardName">Book Issued</div>
            </div>
            <div className="iconBx">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
          </div>
          <div className="card">
            <div>
              <div className="numbers">2</div>
              <div className="cardName">Book Returned</div>
            </div>
            <div className="iconBx">
              <ion-icon name="cart-outline"></ion-icon>
            </div>
          </div>
          <div className="card">
            <div>
              <div className="numbers">10:05AM</div>
              <div className="cardName">In Time</div>
            </div>
            <div className="iconBx">
            
            </div>
          </div>
          <div className="card">
            <div>
              <div className="numbers">3:15PM</div>
              <div className="cardName">Out Time</div>
            </div>
            <div className="iconBx">
              <ion-icon name="cash-outline"></ion-icon>
            </div>
          </div>
        </div>

        <div className="details">
         <h1>Attendence</h1>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendence;
