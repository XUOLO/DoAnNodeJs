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
   import {useParams, useNavigate} from 'react-router-dom'

 
const UpdateStudent = () => {
    const [name, setName] = React.useState('');
    const [age, setAge] = React.useState('');
    const [address, settaddress] = React.useState('');
    const idClass = localStorage.getItem('idClass')

    const params = useParams();
    const navigate = useNavigate()

    useEffect(()=>{
        getUserDetails();
    },[])

    const getUserDetails = async ()=>{
        console.log(params)
        let result = await fetch(`http://localhost:3000/students/${params.id}`)
        result = await result.json()
        const user = result.data;  

        setName(user.name);
       
        setAge(user.age);
        settaddress(user.address);
         
    }

    const updateUsers = async () => {
        try {
          
          let result = await fetch(`http://localhost:3000/students/edit/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, age,address }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          result = await result.json();
          if (result.sucess===true) {
            navigate('/class/detailClass/'+idClass);
            localStorage.removeItem('idClass')
          }
          else{
            alert(result.data);
          }
        } catch (error) {
          
          console.log('Lỗi:', error.message);
          
        }
      };
    return (
      <Row>
        <Col>
          
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-bell me-2"> </i>
             Update User
            </CardTitle>
            <CardBody>
              <Form>
               
                <FormGroup>
                  <Label for="exampleEmail">Student name</Label>
                  <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="with a placeholder"
                    type="text"
                    value={name}   onChange={(e)=> setName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Age</Label>
                  <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="with a placeholder"
                    type="text"
                    value={age}   onChange={(e)=> setAge(e.target.value)} />
 
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Address</Label>
                  <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="with a placeholder"
                    type="text"
                    value={address}   onChange={(e)=> settaddress(e.target.value)} />

                </FormGroup>
             
           
                <button onClick={updateUsers} className='appButton' type='button'>Update student</button>

              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  };
  
  export default UpdateStudent;
  