import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import SideBarPublisher from "./SideBarPublisher";
import SidebarUser from "./SideBarUser";

import Header from "./Header";
import { Container } from "reactstrap";
import React, { useState, useEffect } from 'react'

const FullLayout = () => {
  const auth = localStorage.getItem('user')
  const token = JSON.parse(auth).data;

  const roleLogin = localStorage.getItem('role');

  const [userName, setuserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('');

  useEffect(() => {
    getUserDetails();
  }, []);

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
        setRole(data.data.role);
        localStorage.setItem('role', JSON.stringify(data.data.role));
      } else {
        alert('Failed to get profile');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };
  return (
    <main>
      {/********header**********/}
      <Header />
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow" id="sidebarArea">
          {role === "admin" ? (
            <Sidebar />
          ) : role === "publisher" ? (
            <SideBarPublisher />
          ) : (
            <SidebarUser />
          )}
        </aside>
        {/********Content Area**********/}
        <div className="contentArea">
          {/********Middle Content**********/}
          <Container className="p-4" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;