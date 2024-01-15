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
    <div className='login' style={{ height:'1030px', margin: '0 auto', padding: '20px',backgroundColor: 'rgb(129 243 226)'}}>

 
    <h1 style={{ textAlign: 'center' ,fontSize:'65px'}}>Student Management System</h1>
    
    <div className='formLogin' style={{ marginTop:'170px', marginLeft: '35%' }}> 
          <div>
          {error && <p className="error" style={{ color: 'red' }}>{error}</p>}

      <label htmlFor="email" style={{ display: 'block', marginBottom: '10px'  }}>Email:</label>
      <input type="text" id="email" className='inputBox'required placeholder='Enter username' style={{ display: 'block', width: '50%', padding: '10px' }} 
        onChange={(e) => setuserName(e.target.value)} value={userName} />
    </div>
    <div>
      <label htmlFor="password" style={{ display: 'block', marginBottom: '10px' }}>Password:</label>
      <input type="password" id="password" className='inputBox' placeholder='Enter Password' style={{ display: 'block', width: '50%', padding: '10px' }} 
        onChange={(e) => setPassword(e.target.value)} value={password} />
    </div>
    <div>
      <button onClick={handleLogin} type='button' className='appButton' style={{ backgroundColor: 'blue', color: 'white',marginTop: '10px'}}>
      Login
    </button>
    </div>
    </div>
 
    
  </div>
  )
}

export default Login