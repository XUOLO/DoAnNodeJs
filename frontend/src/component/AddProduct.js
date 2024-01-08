import React from 'react'
import { useNavigate } from 'react-router-dom';

 
const AddProduct = () => {
    const navigate = useNavigate();
    const roleLogin = localStorage.getItem('role')

    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [image, setImage] = React.useState('');

    const [error, setError] = React.useState(false);
    const auth = localStorage.getItem('user')
 
    const token = JSON.parse(auth).data;
    const addProduct = async ()=>{
        if(!name || !price||!description||!image  ){
            setError(true)
            return false
        }
        console.log(name,price )
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        console.log(userId)
        let response = await fetch('http://localhost:3000/products/add',{
            method:'post',
            body:JSON.stringify({name,price,description,image }),
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, 
            }
        })



        if (response.ok) {
            const result = await response.json();
            console.log(result);
             navigate('/');
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
     const isUser = JSON.parse(localStorage.getItem('userName')).data.role === 'user';
     if (roleLogin=='"user"') {
        return (
          <div className="product">
            <h1>Ban khong du quyen.</h1>
          </div>
        );
      }
    
      return (
        <div className="product">
          <h1>Add Product</h1>
          <input
            type="text"
            placeholder="Add Product Name"
            className="inputBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && !name && <span className="invalid-input">Enter Valid name</span>}
    
          <input
            type="text"
            placeholder="Add Product description"
            className="inputBox"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {error && !price && <span className="invalid-input">Enter Valid price</span>}
    
          <input
            type="text"
            placeholder="Add Product Price"
            className="inputBox"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {error && !price && <span className="invalid-input">Enter Valid price</span>}
    
          <input
            type="text"
            placeholder="image path"
            className="inputBox"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          {error && !price && <span className="invalid-input">Enter Valid price</span>}
          <button onClick={addProduct} className="appButton">
            Add Product
          </button>
        </div>
      );
    };
    
    export default AddProduct;