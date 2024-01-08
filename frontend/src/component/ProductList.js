import React, {useState, useEffect } from 'react'
import {Link,useNavigate} from 'react-router-dom'

const ProductList = () => {
    const [products, setProducts] = useState([]);
        const auth = localStorage.getItem('user')
        // const userName = localStorage.getItem('userName')

        const token = JSON.parse(auth).data;
        const navigate = useNavigate();

    useEffect(()=>{
 
        getProducts();
 
        if(auth){
        
          navigate('/home')
         }
         else{
          navigate('/login')
         }
    },[])
    const getProducts = async () => {
        try {
          const result = await fetch('http://localhost:3000/products', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, 
            },
          });
    
          if (result.ok) {
            const data = await result.json();

            // const productList = data.productList;
            // alert(productList);
            setProducts(data.data.productList);
            localStorage.setItem('userName', JSON.stringify(data)); 
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
      let result = await fetch(`http://localhost:3000/products/delete/${id}`,{
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
    let result = await fetch(`http://localhost:3000/products/search/${key}`)
    result = await result.json()
    if(result){
        setProducts(result)
    }
  }else{
      getProducts()
  }
 
 }
 const isAdmin = JSON.parse(localStorage.getItem('userName')).data.role === 'admin';
//  const isUser = JSON.parse(localStorage.getItem('userName')).data.role === 'user';
 const isPublisher = JSON.parse(localStorage.getItem('userName')).data.role === 'publisher';
 const renderOperationButtons = (item) => {
  if (isAdmin) {
    return (
      <>
        <button onClick={() => deleteProduct(item._id)}>Delete</button>
        <Link to={`/products/${item._id}`}>Update</Link>
      </>
    );
  } else if (isPublisher) {
    return <Link to={`/products/${item._id}`}>Update</Link>;
  } else {
    return <a>...</a> ;  
  }
};
 return (
  
    <div className="product-list">
            {/* <a> Welcome {JSON.parse(userName).data.userName} <p>ROLE: {JSON.parse(userName).data.role}</p></a> */}

      <h1>Product List</h1>
      <input type="text" className="search-product-box" placeholder="Search Products" onChange={searchHandle} />
      <ul>
        <li>S. No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Image</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li><img src={item.image} style={{ width: '20px', height: '20px' }} /></li> 
            <li>
              {renderOperationButtons(item)}
            </li>
          </ul>
        ))
      ) : (
        <h1>No Result Found</h1>
      )}
    </div>
  );
};

export default ProductList;