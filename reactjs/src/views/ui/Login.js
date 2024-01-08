import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
 

const Login = () => {
    const [userName, setuserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate()
    const [error, setError] = React.useState('');
    const auth = localStorage.getItem('user')
   useEffect(()=>{
     
 
     if(auth){
        
      navigate('/starter')
     }
     
   },[])

   const handleLogin = async () => {
    try {
      const result = await fetch('http://localhost:3000/authen/login', {
        method: 'post',
        body: JSON.stringify({ userName, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await result.json(); 
      if (result.ok) {
        if(data.sucess===true){
          console.log(data.sucess);
          localStorage.setItem('user', JSON.stringify(data)); 
          localStorage.setItem('userName', JSON.stringify(data)); 
  
           navigate('/starter');
        } 
        
      } else {
  
        setError('Tài khoản hoặc mật khẩu không đúng');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };
  return (
    <div className='login'>
        <h1>Login</h1>
        {error && <p className="error">{error}</p>}

        <input type="text" className='inputBox' placeholder='Enter Email' 
        onChange={(e)=> setuserName(e.target.value)} value={userName}/>
        <input type="password" className='inputBox' placeholder='Enter Password' 
        onChange={(e)=> setPassword(e.target.value)} value={password}/>
        <button onClick={handleLogin} type='button' className='appButton'>Login</button>
    </div>
  )
}

export default Login