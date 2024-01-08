import React, { useEffect } from 'react'
import {useParams, useNavigate} from 'react-router-dom'

const UpdateStudent = () => {
    const [name, setName] = React.useState('');
    const [age, setAge] = React.useState('');
    const [address, settaddress] = React.useState('');
    const idClass = localStorage.getItem('idClass')

    const params = useParams();
    const navigate = useNavigate()

    useEffect(()=>{
        getUserDetails();
    },[])

    const getUserDetails = async ()=>{
        console.log(params)
        let result = await fetch(`http://localhost:3000/students/${params.id}`)
        result = await result.json()
        const user = result.data;  

        setName(user.name);
       
        setAge(user.age);
        settaddress(user.address);
         
    }

    const updateUsers = async () => {
        try {
          
          let result = await fetch(`http://localhost:3000/students/edit/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, age,address }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          result = await result.json();
          if (result.sucess===true) {
            navigate('/class/detailClass/'+idClass);
            localStorage.removeItem('idClass')
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
        <h1>Update student</h1>
        <p>Name</p>
        <input type="text" placeholder='Add email ' className='inputBox'
        value={name}   onChange={(e)=> setName(e.target.value)} />
       <p>Age</p>
        <input type="text" placeholder='Add email ' className='inputBox'
        value={age}   onChange={(e)=> setAge(e.target.value)} />
       <p>Address</p>
        <input type="text" placeholder='Add email ' className='inputBox'
        value={address}   onChange={(e)=> settaddress(e.target.value)} />
       
   
         
        <button onClick={updateUsers} className='appButton'>Update student</button>
    </div>
  )
}

export default UpdateStudent