import React, { useEffect } from 'react'
import {useParams, useNavigate} from 'react-router-dom'

const UpdateProduct = () => {
    const [role, setRole] = React.useState('');
    const [email, setEmail] = React.useState('');
     
    const params = useParams();
    const navigate = useNavigate()

    useEffect(()=>{
        getUserDetails();
    },[])

    const getUserDetails = async ()=>{
        console.log(params)
        let result = await fetch(`http://localhost:3000/users/${params.id}`)
        result = await result.json()
        const user = result.data;  

        setRole(user.role);
       
        setEmail(user.email);
      console.log(user.email)
        
    }

    const updateUsers = async () => {
        try {
          
          let result = await fetch(`http://localhost:3000/users/edit/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ email, role }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          result = await result.json();
          if (result.sucess===true) {
            navigate('/home');
          }
          else{
            alert(result.data);
          }
        } catch (error) {
          
          console.log('Lỗi:', error.message);
          
        }
      };
  return (
    <div className='product'>
        <h1>Update User</h1>
        <p>Email</p>
        <input type="text" placeholder='Add email ' className='inputBox'
        value={email}   onChange={(e)=> setEmail(e.target.value)} />
                <p>Role</p>
                <select className='inputBox' value={role} onChange={(e) => setRole(e.target.value)}>
    <option  >--Select ROLE--</option>
    <option value="user">User</option>

    <option value="admin">Admin</option>
    <option value="publisher">Publisher</option>
</select>
         
        <button onClick={updateUsers} className='appButton'>Update user</button>
    </div>
  )
}

export default UpdateProduct