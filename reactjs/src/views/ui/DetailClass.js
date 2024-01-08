
import React, {useState, useEffect } from 'react'
import {useParams,Link} from 'react-router-dom'
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
   
const ClassDetail = () => {
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
    <div>
     
     <div>
  hello publisher
  </div>
      <div className="product-list">

   
    <div>
    <Card>
      <CardBody>
        <CardTitle tag="h5">      <h1>Student list of class {className}  </h1>
</CardTitle>
         <Link to="/addStudent" className="button-link-student">Add student</Link>

        <input type="text" className="search-product-box" placeholder="Search student" onChange={searchHandle} />

        <Table className="no-wrap mt-3 align-middle" responsive borderless>
          <thead>
            <tr>
              <th>No.</th>
              <th>Student name</th>

              <th>Age</th>
              <th>Address</th>

              <th>Options</th>
             </tr>
          </thead>
          <tbody>
          {detailClass.length > 0 ? (
      detailClass.map((item, index) => (
              <tr key={item._id} className="border-top">
                <td>
                  <div className="d-flex align-items-center p-2">
                    
                    <div className="ms-3">
                      <h5 className="mb-0">{index +1}</h5>
              
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>
                {item.age}
                </td>
                <td>
                {item.address}
                </td>
                <td>   {renderOperationButtons(item)}</td>
           
              </tr>
            ))) : (
              <h1>No student found</h1>
            )}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  </div>

  </div>
    </div>


  );
            }
  export default ClassDetail;