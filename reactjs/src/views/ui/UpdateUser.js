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

  const UpdateUser = () => {

    const [role, setRole] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');

    const params = useParams();
    const navigate = useNavigate()

    useEffect(()=>{
        getUserDetails();
    },[])

    const getUserDetails = async ()=>{
        console.log(params)
        let result = await fetch(`http://localhost:3000/users/${params.id}`)
        result = await result.json()
        const user = result.data;  

        setRole(user.role);
       setName(user.name);
        setEmail(user.email);
      console.log(user.email)
        
    }

    const updateUsers = async () => {
        try {
          
          let result = await fetch(`http://localhost:3000/users/edit/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ email, role ,name}),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          result = await result.json();
          if (result.sucess===true) {
            navigate('/table');
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
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="with a placeholder"
                    type="email"
                    value={email} onChange={(e)=> setEmail(e.target.value)}
                  />
                </FormGroup>
          
                <FormGroup>
                  <Label for="exampleEmail">Full name</Label>
                  <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="with a placeholder"
                    type="name"
                    value={name} onChange={(e)=> setName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">Role</Label>
                  <select className='inputBox' value={role} onChange={(e) => setRole(e.target.value)}>
    <option  >--Select ROLE--</option>
    <option value="user">User</option>

    <option value="admin">Admin</option>
    <option value="publisher">Publisher</option>
</select>
                </FormGroup>
       
           
                <button onClick={updateUsers} className='appButton' type='button'>Update user</button>

              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  };
  
  export default UpdateUser;
  