import React, { useEffect } from 'react'
import {useParams, useNavigate} from 'react-router-dom'

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [teacherName, setteacherName] = React.useState('');
     
    const params = useParams();
    const navigate = useNavigate()

    useEffect(()=>{
        getClassDetails();
    },[])

    const getClassDetails = async ()=>{
        console.log(params)
        let result = await fetch(`http://localhost:3000/class/${params.id}`)
        result = await result.json()
        const user = result.data;  
        console.log(user);
        setName(user.name);
       
        setteacherName(user.teacherName);
         
    }

    const updateClass = async () => {
        try {
          
          let result = await fetch(`http://localhost:3000/class/edit/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, teacherName }),
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
        <h1>Update class</h1>
        <p>Class name</p>
        <input type="text" placeholder='Add name ' className='inputBox'
        value={name}   onChange={(e)=> setName(e.target.value)} />
                <p>Teacher name</p>
                <input type="text" placeholder='Add teacher name ' className='inputBox'
        value={teacherName}   onChange={(e)=> setteacherName(e.target.value)} />
         
        <button onClick={updateClass} className='appButton'>Update class</button>
    </div>
  )
}

export default UpdateProduct