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
   import { useNavigate } from 'react-router-dom';
  import React, { useState, useEffect } from 'react'

  const Forms = () => {



    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const roleLogin = localStorage.getItem('role')

    const navigate = useNavigate();
     
    const collectData = async () => {
        console.log(userName, email, password, role);
        try {
          const response = await fetch('http://localhost:3000/authen/register', {
            method: 'POST',
            body: JSON.stringify({ userName,name, email, password, role }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
      
          if (response.ok) {
            const result = await response.json();
            console.log(result);
             navigate('/table');
          } else {
            const result = await response.json();
            const errorMessage = result.data;
            console.error('Error:', response.status);
            alert(errorMessage);

           }
        } catch (error) {
          console.error('Error:', error);
          // Handle network or other errors
        }
      };

      if (roleLogin==='"user"'||roleLogin==='"publisher"') {
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
              Add New User
            </CardTitle>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">UserName</Label>
                  <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="with a placeholder"
                    type="text"
                    value={userName} onChange={(e)=> setUserName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Full name</Label>
                  <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="with a placeholder"
                    type="text"
                    value={name} onChange={(e)=> setName(e.target.value)}
                  />
                </FormGroup>
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
                  <Label for="examplePassword">Password</Label>
                  <Input
                    id="examplePassword"
                    name="password"
                    placeholder="password placeholder"
                    type="password"
                    value={password} onChange={(e)=> setPassword(e.target.value)}
                  />
                </FormGroup>
                {/* <FormGroup>
                  <Label for="exampleSelect">Role</Label>
                  <select className='inputBox' value={role} onChange={(e) => setRole(e.target.value)}>
    <option  >--Select ROLE--</option>
    <option value="user">User</option>

    <option value="admin">Admin</option>
    <option value="publisher">Publisher</option>
</select>
                </FormGroup> */}
                <div className="input-group mb-3">
  <div className="input-group-prepend">
    <label className="input-group-text" htmlFor="inputGroupSelect01">Role</label>
  </div>
  <select className="custom-select" id="inputGroupSelect01"value={role} onChange={(e) => setRole(e.target.value)}>
    <option  >--Select ROLE--</option>
    <option value="user">User</option>
    <option value="admin">Admin</option>
    <option  value="publisher">Publisher</option>
  </select>
</div>

       
           
                <button onClick={collectData} className="btn btn-success" type='button'>Add user</button>

              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  };
  
  export default Forms;
  