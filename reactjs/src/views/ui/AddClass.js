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
             navigate('/table');
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
      <Row>
        <Col>
          
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-bell me-2"> </i>
              Add New Class
            </CardTitle>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">Class name</Label>
                  <Input
                    id="exampleEmail"
                    name="name"
                    placeholder="with a placeholder"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Teacher name</Label>
                  <Input
                    id="exampleEmail"
                    name="name"
                    placeholder="with a placeholder"
                    type="text"
                    value={teacherName}
            onChange={(e) => setteacherName(e.target.value)}
                  />
                </FormGroup>
           
       
           
                <button onClick={AddClassRoom} className="btn btn-success"type='button'>Add class</button>

              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  };
  
  export default AddClass;
  