import {
    Card,
    Row,
    Col,
    CardTitle,
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
  } from "reactstrap";
  import React,{useEffect, useState} from 'react'
  import { useNavigate } from 'react-router-dom';

 
const AddStudent = () => {
    const navigate = useNavigate();
    const roleLogin = localStorage.getItem('role')

    const [name, setName] = React.useState('');
    const [age, setAge] = React.useState('');
    const [image, setImage] = React.useState('');

    const [address, settaddress] = React.useState('');
   
    const [error, setError] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState('');

    const auth = localStorage.getItem('user')
    const idClass = localStorage.getItem('idClass')

    const token = JSON.parse(auth).data;
    const AddStudentToClass = async ()=>{
        if(!name  ||!age ||!address   ){
          // !image 
            setError(true)
            return false
        }
           let response = await fetch('http://localhost:3000/students/add',{
            method:'post',
            body:JSON.stringify({name,age,address ,image,class_k:idClass}),
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
       const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
          setSelectedFile(reader.result);
        };
    
        if (file) {
          reader.readAsDataURL(file);
        }
      };
    return (
      <Row>
        <Col>
          
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-bell me-2"> </i>
              Add New student
            </CardTitle>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for=" ">Student name</Label>
                  <Input
                    id=" "
                    name="email"
                    placeholder="with a placeholder"
                    type="text"
                    value={name}
            onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for=" ">Age</Label>
                  <Input
                    id=" "
                    name="email"
                    placeholder="with a placeholder"
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for=" ">Address</Label>
                  <Input
                    id=" "
                    name="email"
                    placeholder="with a placeholder"
                    type="text"
                    value={address}
                    onChange={(e) => settaddress(e.target.value)}
                    />
                </FormGroup>
                {/* <FormGroup>
                <Label for=" ">Image</Label>
                <Input
                  placeholder="with a placeholder"
                  type="file"
                  onChange={handleImageUpload}
                />
              </FormGroup> */}
     
           
                <button onClick={AddStudentToClass} className='appButton' type='button'>Add student</button>

              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  };
  
  export default AddStudent;
  