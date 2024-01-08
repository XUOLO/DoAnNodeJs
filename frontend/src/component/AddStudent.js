import React from 'react'
import { useNavigate } from 'react-router-dom';

 
const AddStudent = () => {
    const navigate = useNavigate();
    const roleLogin = localStorage.getItem('role')

    const [name, setName] = React.useState('');
    const [age, setAge] = React.useState('');

    const [address, settaddress] = React.useState('');
   
    const [error, setError] = React.useState(false);
    const auth = localStorage.getItem('user')
    const idClass = localStorage.getItem('idClass')

    const token = JSON.parse(auth).data;
    const AddStudentToClass = async ()=>{
        if(!name  ||!age ||!address   ){
            setError(true)
            return false
        }
           let response = await fetch('http://localhost:3000/students/add',{
            method:'post',
            body:JSON.stringify({name,age,address ,class_k:idClass}),
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, 
            }
        })

        if (response.ok) {
            const result = await response.json();
            console.log(result);
            
             navigate('/class/detailClass/'+idClass);
             localStorage.removeItem('idClass')
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
          <h1>Add student</h1>
          <input
            type="text"
            placeholder="Add student name"
            className="inputBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && !name && <span className="invalid-input">Enter Valid name</span>}
    
          <input
            type="text"
            placeholder="Add student address"
            className="inputBox"
            value={address}
            onChange={(e) => settaddress(e.target.value)}
          />
          {error && !address && <span className="invalid-input">Enter Valid address</span>}
          <input
            type="text"
            placeholder="Add student age"
            className="inputBox"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {error && !age && <span className="invalid-input">Enter Valid age</span>}
    
          
          <button onClick={AddStudentToClass} className="appButton">
            Add student
          </button>
        </div>
      );
    };
    
    export default AddStudent;