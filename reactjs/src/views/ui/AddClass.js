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
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddClass = () => {

  const navigate = useNavigate();
  const roleLogin = localStorage.getItem('role')

  const [name, setName] = React.useState('');

  const [selectedTeacher, setSelectedTeacher] = React.useState({
    name: '',
    teacherID: ''
  });  const [userList, setuserList] = React.useState('');

  const [error, setError] = React.useState(false);
  const auth = localStorage.getItem('user')

  const token = JSON.parse(auth).data;
  const AddClassRoom = async () => {
    // if (!name || !teacherName) {
    //   setError(true)
    //   return false
    // }
    let response = await fetch('http://localhost:3000/class/add', {
      method: 'post',
    body: JSON.stringify({ name, teacherName: selectedTeacher.name, user_k: selectedTeacher.teacherID }),
      headers: {
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

  useEffect(() => {


    getListUser();
  }, [])
  const getListUser = async () => {
    try {
      const result = await fetch('http://localhost:3000/users/teacherList', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
      });

      if (result.ok) {

        const data = await result.json();

        setuserList(data.data);


      } else {
        const data = await result.json();

        // alert(data.data);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };
  if (error) {
    return <h1>Error: {error}</h1>;
  }
  if (roleLogin === '"user"') {
    return (
      <div className="product">
        <h1>Ban khong du quyen.</h1>
      </div>
    );
  }

  if (roleLogin === '"admin"'||roleLogin==='"publisher"') {
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
            {userList.length > 0 ? (
              <select className="custom-select" id="inputGroupSelect01" value={selectedTeacher.teacherID} onChange={(e) => {
                  const selectedInfo = userList.find(user => user._id === e.target.value);
                  setSelectedTeacher({
                    name: selectedInfo.name,
                    teacherID: selectedInfo._id
                  });
                }}>
                <option value="" disabled>--Select teacher--</option>
                {userList.map((item, index) => (
                  <option key={item._id} value={item._id}>{item.name}</option>
                ))}
              </select>
            ) : (
              <h1>No Result Found</h1>
            )}
          </FormGroup>


              <button onClick={AddClassRoom} className="btn btn-success" type='button'>Add class</button>

            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
   }
};

export default AddClass;
