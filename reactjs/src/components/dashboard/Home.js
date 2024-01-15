import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import React, {useState, useEffect } from 'react'
import { useParams,Link, useNavigate } from 'react-router-dom'
 
const ProjectTables = () => {

  const [userName, setuserName] = useState('');
  const [name, setName] = useState('');

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
        setName(data.data.name);
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
 
    <div className="row">
    <div className="col-md-4">
      <div className="profile">
        <div className="card" style={{ width: '18rem' }}>
          <img className="card-img-top" src="https://i.pinimg.com/564x/29/b8/d2/29b8d250380266eb04be05fe21ef19a7.jpg" alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">User info</h5>
            <p className="card-text">Name: {name}</p>
            <p className="card-text">Email: {email}</p>
            <p className="card-text">Role: {role}</p>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-7">
      {/* <div className="card text-white bg-warning mb-3" style={{ maxWidth: '18rem' }}>
        <div className="card-header">Total Users</div>
        <div className="card-body">
          <h5 className="card-title">{countUser}</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
      <div className="card text-white bg-primary mb-3" style={{ maxWidth: '18rem' }}>
        <div className="card-header">Total Users</div>
        <div className="card-body">
          <h5 className="card-title">{countUser}</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div> */}

    </div>
  </div>

    
  );
};
 
 

export default ProjectTables;
