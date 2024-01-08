import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../LoginCss.css';
const Signup = () => {
    const [userName, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const roleLogin = localStorage.getItem('role')

    const navigate = useNavigate();
     

    const collectData = async () => {
        console.log(userName, email, password, role);
        try {
          const response = await fetch('http://localhost:3000/authen/register', {
            method: 'POST',
            body: JSON.stringify({ userName, email, password, role }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
      
          if (response.ok) {
            const result = await response.json();
            console.log(result);
             navigate('/login');
          } else {
            const result = await response.json();
            const errorMessage = result.data;
            console.error('Error:', response.status);
            alert(errorMessage);

           }
        } catch (error) {
          console.error('Error:', error);
          // Handle network or other errors
        }
      };

      if (roleLogin==='"user"'||roleLogin==='"publisher"') {
        return (
          <div className="product">
            <h1>Ban khong du quyen.</h1>
          </div>
        );
      }
  return (
    <div className='register'>
        <h1>Add user</h1>
        <input className='inputBox' type="text" placeholder='Enter username'
        value={userName} onChange={(e)=> setName(e.target.value)} />
        <input className='inputBox' type="text" placeholder='Enter Email'
        value={email} onChange={(e)=> setEmail(e.target.value)} />
        <input className='inputBox' type="password" placeholder='Enter Password'
        value={password} onChange={(e)=> setPassword(e.target.value)} />
        <select className='inputBox' value={role} onChange={(e) => setRole(e.target.value)}>
    <option  >--Select ROLE--</option>
    <option value="user">User</option>

    <option value="admin">Admin</option>
    <option value="publisher">Publisher</option>
</select>
        <button onClick={collectData} className='appButton' type='button'>Add user</button>
    </div>
  )
}

export default Signup