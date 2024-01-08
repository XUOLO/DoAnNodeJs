import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import React, {useState, useEffect } from 'react'
import { useParams,Link, useNavigate } from 'react-router-dom'
 
const ProjectTables = () => {

  const [userName, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [countUser, setcountUser] = useState('');

  const params = useParams();
  const navigate = useNavigate();
  const auth = localStorage.getItem('user');
  const token = JSON.parse(auth).data;

  useEffect(() => {
    getUserDetails();
    countUsers();
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
      } else {
        const data = await result.json();
        setError(data.data);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred');
    }
  };

  const countUsers = async () => {
    try {
      const result = await fetch('http://localhost:3000/users/count', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          
        },
      });

      if (result.ok) {
        const rs = await result.json();
         setcountUser(rs.data)
      } else {
        const rs = await result.json();
        setError(rs.data);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred');
    }
  };
  if (error) {
    return <h1>Error: {error}</h1>;
  }
  return (
    <div className="profile">
      <h1>User info</h1>
      <p>Username: {userName}</p>
      <p>Email: {email}</p>
      <p>Role: {role}</p>
      <div>
    total user: {countUser}

      </div>
    </div>

    
  );
};
 
 

export default ProjectTables;
