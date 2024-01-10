import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import user1 from "../assets/images/users/user4.jpg";
import probg from "../assets/images/bg/download.jpg";
import React, { useState, useEffect } from 'react'

import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
 import { useParams, useNavigate } from 'react-router-dom'

const SidebarUser = () => {
 

    const [userName, setuserName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [role, setRole] = React.useState('');
     const [detailClassUser, setDetailClassUser] = React.useState('');
  
    const [userList, setuserList] = React.useState('');
  
    const [classList, setclassList] = React.useState('');
    const [userId, setuserId] = React.useState('');
  
    const params = useParams();
    const navigate = useNavigate()
    const roleLogin = localStorage.getItem('role')
    const idUser = localStorage.getItem('userId')
  
    const auth = localStorage.getItem('user')
    const token = JSON.parse(auth).data;
    useEffect(() => {
        // if(!auth){
        //   navigate('/login')
        // }
         
        getUserDetails();
      
      }, [])  
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();
   
  const getUserDetails = async () => {
    try {
      const result = await fetch('http://localhost:3000/authen/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (result.ok) {

        const data = await result.json();
         setEmail(data.data.email);
        setuserName(data.data.userName);
        setuserId(data.data._id);
         setRole(data.data.role);
        localStorage.setItem('role', JSON.stringify(data.data.role));
        localStorage.setItem('userId', data.data._id);
        // alert(data.data._id);

      } else {
        alert('Failed to get profile');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };
  return (
    <div>
        hello TEACHER
      <div className="d-flex align-items-center"></div>
      <div
        className="profilebg"
        style={{ background: `url(${probg}) no-repeat` }}
      >
        <div className="p-3 d-flex">
          {/* <img src={user1} alt="user" width="50" className="rounded-circle" /> */}
          <Button
            color="white"
            className="ms-auto text-white d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-x"></i>
          </Button>
        </div>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          <NavItem className="sidenav-bg">
            <Link
              to={"/starter"}
              className={
                location.pathname === "/starter"
                  ? "active nav-link py-3"
                  : "nav-link text-secondary py-3"
              }
            >
              <i className="bi bi-speedometer2"></i>
              <span className="ms-3 d-inline-block">Dashboard</span>
            </Link>
          </NavItem>
          <NavItem className="sidenav-bg">
            <Link
       to={`/class/classUser/${userId}`}
              className={
                location.pathname === "/class/classUser/"
                  ? "active nav-link py-3"
                  : "nav-link text-secondary py-3"
              }
            >
              <i className="bi bi-layout-split"></i>
              <span className="ms-3 d-inline-block">Class list</span>
            </Link>
          </NavItem>
           
        </Nav>
      </div>
    </div>
  );
};

export default SidebarUser;
