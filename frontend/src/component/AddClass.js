import React from 'react'
import { useNavigate } from 'react-router-dom';

 
const AddClass = () => {
    const navigate = useNavigate();
    const roleLogin = localStorage.getItem('role')

    const [name, setName] = React.useState('');
  
    const [teacherName, setteacherName] = React.useState('');
   
    const [error, setError] = React.useState(false);
    const auth = localStorage.getItem('user')
 
    const token = JSON.parse(auth).data;
    const AddClassRoom = async ()=>{
        if(!name  ||!teacherName   ){
            setError(true)
            return false
        }
           let response = await fetch('http://localhost:3000/class/add',{
            method:'post',
            body:JSON.stringify({name,teacherName }),
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, 
            }
        })



        if (response.ok) {
            const result = await response.json();
            console.log(result);
             navigate('/home');
          } else {
            const result = await response.json();
            const errorMessage = result.data;
            console.error('Error:', response.status);
            alert(errorMessage);
            const data = await result.json();
            setError(data.data);
           }

        
    }
    if (error) {
        return <h1>Error: {error}</h1>;
      }
      if (roleLogin==='"user"') {
        return (
          <div className="product">
            <h1>Ban khong du quyen.</h1>
          </div>
        );
      }
    
      return (
        <div className="product">
          <h1>Add Class</h1>
          <input
            type="text"
            placeholder="Add class name"
            className="inputBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && !name && <span className="invalid-input">Enter Valid name</span>}
    
          <input
            type="text"
            placeholder="Add  teacher Name"
            className="inputBox"
            value={teacherName}
            onChange={(e) => setteacherName(e.target.value)}
          />
          {error && !teacherName && <span className="invalid-input">Enter Valid teacherName</span>}
    
          
          <button onClick={AddClassRoom} className="appButton">
            Add Product
          </button>
        </div>
      );
    };
    
    export default AddClass;