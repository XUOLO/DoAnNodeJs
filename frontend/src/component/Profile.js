import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userName, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const params = useParams();
  const navigate = useNavigate();
  const auth = localStorage.getItem('user');
  const token = JSON.parse(auth).data;

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
      } else {
        const data = await result.json();
        setError(data.data);
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
    </div>
  );
};

export default Profile;