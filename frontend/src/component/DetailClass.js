import React, {useState, useEffect } from 'react'
import {useParams,Link} from 'react-router-dom'

const DetailClass = () => {
    const [products, setProducts] = useState([]);
    const [detailClass, setdetailClass] = useState([]);

        const auth = localStorage.getItem('user')
        const userName = localStorage.getItem('userName')
        const classId = localStorage.getItem('classId')
        const [className, setclassName] = useState([]);

        const token = JSON.parse(auth).data;
        const params = useParams();
        const roleLogin = localStorage.getItem('role')

    useEffect(()=>{
 
        getProducts();
 
    },[])
    const getProducts = async () => {
        try {
          const result = await fetch(`http://localhost:3000/class/detailClass/${params.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (result.ok) {
            const data = await result.json();
            // alert(params.id)
            // const productList = data.productList;
            // alert(data.data);
            console.log(result);
            setclassName(data.data.name);
            setdetailClass(data.data.student);
            localStorage.setItem('idClass', params.id); 

            // localStorage.setItem('userName', JSON.stringify(data)); 
          } else {
            alert('Failed to get products');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred');
        }
      };
    
  const deleteProduct = async (id)=>{
      console.log(id)
      let result = await fetch(`http://localhost:3000/students/delete/${id}`,{
          method:'Delete',
          
      })
      result = await result.json();
      if(result){
        getProducts();
      }
  }

 const searchHandle = async (e)=>{
  let key = e.target.value
  if(key){
    let result = await fetch(`http://localhost:3000/students/search/${params.id}/${key}`)

    
    result = await result.json()    
    if(result){
        setdetailClass(result)
    }
  }else{
      getProducts()
  }
 
 }
 const isAdmin = JSON.parse(localStorage.getItem('userName')).data.role === 'admin';
//  const isUser = JSON.parse(localStorage.getItem('userName')).data.role === 'user';
 const isPublisher = JSON.parse(localStorage.getItem('userName')).data.role === 'publisher';
 const renderOperationButtons = (item) => {
  if (roleLogin==='"admin"'||roleLogin==='"publisher"') {
    return (
      <>
        <button onClick={() => deleteProduct(item._id)}>Delete</button>
        <Link to={`/students/${item._id}`}>Update</Link>
      </>
    );
  } else {
    return <a>...</a> ;  
  }
};
 return (
  
    <div className="product-list">
 
      <h1>Student list of class {className}  </h1>
      <input type="text" className="search-product-box" placeholder="Search student" onChange={searchHandle} />
          <Link to="/addStudent" className="button-link-student">Add student</Link>

      <ul>
        <li>S. No.</li>
        <li>Student Name</li>
        <li>Age</li>
        <li>Address</li>
        <li>Operation</li>
      </ul>
      {detailClass.length > 0 ? (
        detailClass.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.age}</li>
            <li>{item.address}</li>

             <li>
              {renderOperationButtons(item)}
            </li>
          </ul>
        ))
      ) : (
        <h1>No Student Found</h1>
      )}
    </div>
  );
};

export default DetailClass;