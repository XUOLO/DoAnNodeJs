import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,

  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


const UpdateStudent = () => {
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState('');
  const [address, settaddress] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [test15, settest15] = React.useState('');
  const [test45, settest45] = React.useState('');
  const [terms, setterms] = React.useState('');
  const [AOS, setAOS] = React.useState('');

  const idClass = localStorage.getItem('idClass')

  const params = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    getUserDetails();
  }, [])

  const getUserDetails = async () => {
    console.log(params)
    let result = await fetch(`http://localhost:3000/students/${params.id}`)
    result = await result.json()
    const user = result.data;

    setName(user.name);
    settest15(user.test15)
    settest45(user.test45)
    setterms(user.terms)
    setAOS(user.AOS)
    setAge(user.age);
    settaddress(user.address);

  }

  const updateUsers = async () => {
    try {

      let result = await fetch(`http://localhost:3000/students/edit/${params.id}`, {
        method: 'Put',
        body: JSON.stringify({ name, age, address, gender, test15, test45, terms, AOS }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      result = await result.json();
      if (result.sucess === true) {
        navigate('/class/detailClass/' + idClass);
        localStorage.removeItem('idClass')
      }
      else {
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
            Update student
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
                  value={name} onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Age</Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="with a placeholder"
                  type="text"
                  value={age} onChange={(e) => setAge(e.target.value)} />

              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Address</Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="with a placeholder"
                  type="text"
                  value={address} onChange={(e) => settaddress(e.target.value)} />

              </FormGroup>
              <FormGroup>
                <Label for="gender">Gender</Label>
                <div>
                  <Label>
                    <Input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={gender === 'Male'}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    Male
                  </Label>

                  <Label>
                    <Input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={gender === 'Female'} style={{ marginLeft: '5px;' }}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    Female
                  </Label>
                </div>
              </FormGroup>

              <button onClick={updateUsers} className="btn btn-primary" style={{ color: 'white', textDecoration: 'underline', marginLeft: '5px' }} type='button'>Update student</button>

            </Form>
          </CardBody>
        </Card>
        <table style={{ border: '1px solid black', width: '100%' }}>
          <thead>
            <tr>

              <th style={{ border: '1px solid black', padding: '8px' }}>Test 15'</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Test 45'</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Terms</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Average subject</th>
            </tr>
          </thead>
          <tbody>
            <tr>

              <td style={{ border: '1px solid black', padding: '8px' }}> <Input type="text" value={test15} onChange={(e) => settest15(e.target.value)} /></td>
              <td style={{ border: '1px solid black', padding: '8px' }}><Input type="text"  value={test45} onChange={(e) => settest45(e.target.value)} /></td>
              <td style={{ border: '1px solid black', padding: '8px' }}><Input type="text" value={terms} onChange={(e) => setterms(e.target.value)} /></td>
              <td style={{ border: '1px solid black', padding: '8px' }}><Input type="text" value={AOS} onChange={(e) => setAOS(e.target.value)} /></td>
            </tr>
            {/* Các hàng dữ liệu khác */}
          </tbody>
        </table>
      </Col>
    </Row>
  );
};

export default UpdateStudent;
