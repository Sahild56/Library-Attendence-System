import React, { useState ,useEffect} from "react";
import "./AdminDashboard.css"; // Import CSS styles for the component
import customer1 from '../../assets/customer01.jpg'
import customer2 from '../../assets/customer02.jpg'
import { CiLogout } from "react-icons/ci";
import { IoBookSharp } from "react-icons/io5";
import { GoAlertFill } from "react-icons/go";
import { HiMiniBellAlert } from "react-icons/hi2";
import {Link} from 'react-router-dom'
import axios from 'axios'
const AdminBooks = () => {
  const [studentEmail , setStudentEmail] = useState("");
  const [loginDate , setLloginDate] = useState("");
  const [loginTime , setLoginTime] = useState("");
  const [logoutDate , setLogoutDate] = useState("");
  const [logoutTime , setLogoutTime] = useState("");

  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalStudents, settotalStudents] = useState(0);

  useEffect(() => {
    const fetchbooks = async () => {
      try {
        const response = await axios.get('http://localhost:4556/admin/books');
        if (Array.isArray(response.data)) {
            setBooks(response.data);
            setTotalBooks(response.data.length);
        } else {
          console.error('Invalid data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchbooks();
  }, []);
  



  useEffect(() => {
    const fetchbooks = async () => {
      try {
        const response = await axios.get('http://localhost:4556/userdata');
        settotalStudents(response.data.length)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchbooks();
  }, []);



  useEffect(() => {
    const fetchUserLoginData = async () => {
      try {
        const response = await axios.get("http://localhost:4556/send-logindata");
        setStudentEmail(response.data.email);
        setLloginDate(response.data.loginDate);
        setLoginTime(response.data.loginTime);
      } catch (error) {
        console.error("Error fetching user login data:", error);
      }
    };

    fetchUserLoginData();
  }, []);


  useEffect(() => {
    const fetchUserLogoutData = async () => {
      try {
        const response = await axios.get("http://localhost:4556/send-logoutdata");
        setLogoutDate(response.data.logoutDate);
        setLogoutTime(response.data.logoutTime);
      } catch (error) {
        console.error("Error fetching user logout  data:", error);
      }
    };

    fetchUserLogoutData();
  }, []);


  return (
    <div className="container" >
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
          <Link to='/admin' className="justify-between">
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
              <div className="numbers">{totalStudents}</div>
              <div className="cardName">Students</div>
            </div>
            <div className="iconBx">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
          </div>
          <div className="card">
            <div>
              <div className="numbers">{totalBooks}</div>
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

        <div className="details" style={{width:'100%'}}>
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>All Books</h2>
              <Link to="/admin/addbooks" className="btn" style={{background:"rgba(113, 99, 186, 255)"}}>
                Add Books
              </Link>
            </div>
         <br />
         <br />
            <div className="booktable" style={{ height: '300px', overflowY: 'scroll',width:"130%",position:'relative',left:'-10%',top:'-20px' }}>
            <table>
  <tr style={{color:'rgba(113, 99, 186, 255)'}}>
    <th>Title</th>
    <th>Author</th>
    <th>Country</th>
    <th>Language</th>
    <th>year</th>
  </tr>
  {books.map((book, index) => (
      <tr key={index}>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.country}</td>
        <td>{book.language}</td>
        <td>{book.year}</td>
      </tr>
    ))}
  
</table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBooks;
