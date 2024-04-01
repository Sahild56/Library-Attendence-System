import React, { useState ,useEffect} from "react";
import "./AdminDashboard.css"; // Import CSS styles for the component
import customer1 from '../../assets/customer01.jpg'
import customer2 from '../../assets/customer02.jpg'
import { CiLogout } from "react-icons/ci";
import { IoBookSharp } from "react-icons/io5";
import { GoAlertFill } from "react-icons/go";
import { HiMiniBellAlert } from "react-icons/hi2";
import {Link , useNavigate , useLocation} from 'react-router-dom'
import axios from 'axios'
const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [logoutDate, setLogoutDate] = useState("");
  const [logoutTime, setLogoutTime] = useState("");
  const [userData, setUserData] = useState([]);
  const [studcnt, setStudcnt] = useState(0);
  const [todayStud, setTodayStud] = useState(0);

  const todaysDate = new Date();
  
  const [bookDetails , setBookDetails] = useState([]);

  useEffect(() => {
    const fetchbookDetails = async () => {
      try {
        const response = await axios.get("http://localhost:4556/bookdetails");
        setBookDetails(response.data);
      } catch (error) {
        console.error("Error fetching user login data:", error);
      }
    };

    fetchbookDetails();
  }, []);




  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:4556/userdata");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user login data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const studentCount = userData.filter((user) => user.role === 'Student').length;
    setStudcnt(studentCount);

    const todaysCount = userData.filter((user) => user.loginDate === todaysDate).length;
    setTodayStud(todaysCount);

    console.log("Student Count:", studentCount);
    console.log("Today's Student Count:", todaysCount);
    console.log("User Data:", userData);
  }, [userData, todaysDate]);


  const handleLogout = (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(
      "0" +
      (currentDate.getMonth() + 1)
    ).slice(-2)}-${("0" + currentDate.getDate()).slice(-2)}`;
    const formattedTime = `${("0" + currentDate.getHours()).slice(-2)}:${(
      "0" + currentDate.getMinutes()
    ).slice(-2)}:${("0" + currentDate.getSeconds()).slice(-2)}`;
    setLogoutDate(formattedDate);
    setLogoutTime(formattedTime);

    axios
      .post("http://localhost:4556/logout", {
        email: location.state.email,
        password: location.state.password,
        role: location.state.role,
        logoutDate: formattedDate,
        logoutTime: formattedTime
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.code === 500) {
          alert("User Not Found");
        }
        if (res.data.code === 404) {
          alert("Password is wrong");
        }
        if (res.data.code === 200) {
          // move to home
          navigate("/");
          
          localStorage.setItem("TOKEN", res.data.token);
          localStorage.setItem("EMAIL", res.data.email);
        }
      })
      .catch((err) => {
        console.log("front error=======", err);
      });
  };


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
            <Link to="/" onClick={handleLogout}>
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
        <li><Link to ='/' onClick={handleLogout}>Logout</Link></li>
      </ul>
    </div>
        </div>

        <div className="cardBox">
          <div className="card">
            <div>
              <div className="numbers">{studcnt}</div>
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
              <div className="numbers">{todayStud}</div>
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
              <h2>Today's Students</h2>
              <Link to="/admin/student" className="btn" style={{position:'relative',left:'50%'}}>
                View All
              </Link>
            </div>

            <div className="studtable" style={{height: '300px', overflowY: 'scroll',width:'150%',position:'relative',left:'-30px'}}>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Book Name</th>
                        <th>Book Issued Date</th>
                        <th>Book Return Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
  {userData
    .filter((user) => user.role === 'Student')
    .map((user) => (
      <React.Fragment key={user._id}>
        <tr>
          <td>{user.name}</td>
          <td>{user.contact}</td>
          <td colSpan="4"></td> {/* Empty columns for book details */}
        </tr>
        {bookDetails
          .filter((book) => book.email === user.email)
          .map((book) => (
            <tr key={book._id}>
              <td></td> {/* Empty column for name */}
              <td></td> {/* Empty column for contact */}
              <td>{book.title}</td>
              <td>{book.bookIssuedDate}</td> {/* Adjust this to match your data */}
              <td>{book.bookReturnDate}</td> {/* Adjust this to match your data */}
              <td>{book.status}</td>
            </tr>
          ))}
      </React.Fragment>
    ))}
</tbody>
            </table>

            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
