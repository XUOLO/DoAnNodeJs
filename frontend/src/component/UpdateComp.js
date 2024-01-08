import React, { useEffect } from 'react'
import {useParams, useNavigate} from 'react-router-dom'

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [image, setImage] = React.useState('');

    const params = useParams();
    const navigate = useNavigate()

    useEffect(()=>{
     getProductDetails();
    },[])

    const getProductDetails = async ()=>{
        console.log(params)
        let result = await fetch(`http://localhost:3000/products/${params.id}`)
        result = await result.json()
        const product = result.data[0];  

        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setImage(product.image);
        
    }

    const updateProduct = async () => {
        try {
          console.log(name, price);
          let result = await fetch(`http://localhost:3000/products/edit/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, price, description, image }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          result = await result.json();
          if (result.sucess===true) {
            navigate('/');
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
        <h1>Update Product</h1>
        <p>Product Name</p>
        <input type="text" placeholder='Add Product Name' className='inputBox'
        value={name}   onChange={(e)=> setName(e.target.value)} />
                <p>Description</p>

        <input type="text" placeholder='Add Product Price' className='inputBox'
        value={description}   onChange={(e)=> setDescription(e.target.value)} />
                <p>Price</p>

        <input type="text" placeholder='Add Product Name' className='inputBox'
        value={price}   onChange={(e)=> setPrice(e.target.value)} />
                <p>Image path</p>

        <input type="text" placeholder='Add Product Price' className='inputBox'
        value={image}   onChange={(e)=> setImage(e.target.value)} />
        
         
        <button onClick={updateProduct} className='appButton'>Update Product</button>
    </div>
  )
}

export default UpdateProduct