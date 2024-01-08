import React, {useState, useEffect } from 'react'
import { useParams,Link, useNavigate } from 'react-router-dom'
 
const ProductList = () => {
    const [userName, setuserName] = React.useState('');
     const [email, setEmail] = React.useState('');
     const [role, setRole] = React.useState('');
     const [userList, setuserList] = React.useState('');

     const [classList, setclassList] = React.useState('');



    const params = useParams();
    const navigate = useNavigate()
    const roleLogin = localStorage.getItem('role')

    const auth = localStorage.getItem('user')
    const token = JSON.parse(auth).data;
   useEffect(()=>{
    getUserDetails();
    getListUser();
    getClassRoom();
},[])

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
        localStorage.setItem('role', JSON.stringify(data.data.role)); 

      } else {
        alert('Failed to get profile');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };
  
  const searchHandle = async (e)=>{
    let key = e.target.value
    if(key){
      let result = await fetch(`http://localhost:3000/users/search/${key}`)
      result = await result.json()
      if(result){
        setuserList(result)
      }
    }else{
      getListUser();
    }
   
   }

   const deleteClassRoom = async (id)=>{
     let result = await fetch(`http://localhost:3000/class/delete/${id}`,{
        method:'Delete',
        
    })
    result = await result.json();
    if(result){
      getClassRoom();
    }
}
const deleteUser = async (id)=>{
  console.log(id)
  let result = await fetch(`http://localhost:3000/users/delete/${id}`,{
      method:'Delete',
      
  })
  result = await result.json();
  if(result){
    getListUser();
  }
}
const getClassRoom = async () => {
  try {
    const result = await fetch('http://localhost:3000/class', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
      },
    });

    if (result.ok) {
         
      const data = await result.json();
       
      setclassList(data.data);
       

    } else {
      alert('Failed to get class list');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred');
  }
};

  const getListUser = async () => {
    try {
      const result = await fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`, 
        },
      });
  
      if (result.ok) {
         
        const data = await result.json();
         
        setuserList(data.data);
         

      } else {
        alert('Failed to get userList');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };
  const searchClassHandle = async (e)=>{
    let key = e.target.value
    if(key){
      let result = await fetch(`http://localhost:3000/class/search/${key}`)
  
      
      result = await result.json()    
      if(result){
          setclassList(result)
      }
    }else{
        getClassRoom()
    }
  }
  if (roleLogin==='"admin"') {
    return (
      <div>
        <h2>Hello {userName}</h2>
        <p>ROLE: {role}</p>


        <div className="product-list">
            {/* <a> Welcome {JSON.parse(userName).data.userName} <p>ROLE: {JSON.parse(userName).data.role}</p></a> */}

      <h1>User List</h1>
        <p>
    <Link to="/signup" className="button-link">Add user</Link>
  </p>
      <input type="text" className="search-product-box" placeholder="Search user" onChange={searchHandle} />
      <ul>
        <li>S. No.</li>
        <li>username</li>
        <li>role</li>
         
        <li>Operation</li>
      </ul>
      {userList.length > 0 ? (
        userList.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.userName}</li>
            <li>{item.role}</li>
            
            <li>
            <button onClick={() => deleteUser(item._id)}>Delete</button>
        <Link to={`/users/${item._id}`}>Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Result Found</h1>
      )}
    </div>
      </div>


    );
  }
  if (roleLogin==='"publisher"') {
    return (
      <div>
        <h2>Hello {userName}</h2>
        <p>ROLE: {role}</p>


        <div className="product-list">
 
      <h1>Publisher</h1>
      <input type="text" className="search-product-box" placeholder="Search class" onChange={searchClassHandle} />
      <Link to="/addClass" className="button-link">Add class</Link>
        <p>
     
    
    {/* <Link to="/addStudent" className="button-link-student">Add student</Link> */}
    <ul>
        <li>S. No.</li>
        <li>Class Name</li>
        <li>Teacher Name</li>
         
        <li>Operation</li>
      </ul>
      {classList.length > 0 ? (
        classList.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.teacherName}</li>
            
            <li>
            <button onClick={() => deleteClassRoom(item._id)}>Delete</button>
        <Link to={`/class/${item._id}`}>Update</Link>
        <span></span>
        <Link to={`/class/detailClass/${item._id}`}>Class detail</Link>

            </li>
          </ul>
        ))
      ) : (
        <h1>No Result Found</h1>
      )}
  </p>
  
    </div>
      </div>


    );
  }
 return (
    <div className="product-list">
   
      <div>
        <h2>Hello {userName}</h2>
        <p>ROLE: {role}</p>
      </div>
      
        
    
  </div>
  );
};

export default ProductList;