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

  const UpdateClass = () => {
    const [name, setName] = React.useState('');
    const [teacherName, setteacherName] = React.useState('');
     
    const params = useParams();
    const navigate = useNavigate()

    useEffect(()=>{
        getClassDetails();
    },[])

    const getClassDetails = async ()=>{
        console.log(params)
        let result = await fetch(`http://localhost:3000/class/${params.id}`)
        result = await result.json()
        const user = result.data;  
        console.log(user);
        setName(user.name);
       
        setteacherName(user.teacherName);
         
    }

    const updateClass = async () => {
        try {
          
          let result = await fetch(`http://localhost:3000/class/edit/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, teacherName }),
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
             Update Class
            </CardTitle>
            <CardBody>
              <Form>
               
                <FormGroup>
                  <Label for="exampleEmail">Name</Label>
                  <Input
                    id="exampleEmail"
                    name="text"
                    placeholder="with a placeholder"
                    type="text"
                    value={name}   onChange={(e)=> setName(e.target.value)}
                  />
                </FormGroup>
                 <FormGroup>
                  <Label for="exampleEmail">Teacher name</Label>
                  <Input
                    id="exampleEmail"
                    name="text"
                    placeholder="with a placeholder"
                    type="text"
                    value={teacherName}   onChange={(e)=> setteacherName(e.target.value)} />
 
                </FormGroup>
           
                <button onClick={updateClass} className='appButton' type='button'>Update class</button>

              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  };
  
  export default UpdateClass;
  