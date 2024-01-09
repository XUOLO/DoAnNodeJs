import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

const ProjectTables = () => {


  const [userName, setuserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('');
  const [userList, setuserList] = React.useState('');

  const [classList, setclassList] = React.useState('');



  const params = useParams();
  const navigate = useNavigate()
  const roleLogin = localStorage.getItem('role')

  const auth = localStorage.getItem('user')
  const token = JSON.parse(auth).data;
  useEffect(() => {
    // if(!auth){
    //   navigate('/login')
    // }
    getUserDetails();
    getListUser();
    getClassRoom();
  }, [])
  const deleteUser = async (id) => {
    console.log(id)
    let result = await fetch(`http://localhost:3000/users/delete/${id}`, {
      method: 'Delete',

    })
    result = await result.json();
    if (result) {
      getListUser();
    }
  }
  const getClassRoom = async () => {
    try {
      const result = await fetch('http://localhost:3000/class', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (result.ok) {

        const data = await result.json();

        setclassList(data.data);


      } else {
        alert('Failed to get class list');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };
  const getUserDetails = async () => {
    try {
      const result = await fetch('http://localhost:3000/authen/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (result.ok) {

        const data = await result.json();

        setEmail(data.data.email);
        setuserName(data.data.userName);
        setRole(data.data.role);
        localStorage.setItem('role', JSON.stringify(data.data.role));

      } else {
        alert('Failed to get profile');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };
  const getListUser = async () => {
    try {
      const result = await fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`, 
        },
      });

      if (result.ok) {

        const data = await result.json();

        setuserList(data.data);


      } else {
        alert('Failed to get userList');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };
  const deleteClassRoom = async (id) => {
    let result = await fetch(`http://localhost:3000/class/delete/${id}`, {
      method: 'Delete',

    })
    result = await result.json();
    if (result) {
      getClassRoom();
    }
  }
  const searchClassHandle = async (e) => {
    let key = e.target.value
    if (key) {
      let result = await fetch(`http://localhost:3000/class/search/${key}`)


      result = await result.json()
      if (result) {
        setclassList(result)
      }
    } else {
      getClassRoom()
    }
  }
  const searchHandle = async (e) => {
    let key = e.target.value
    if (key) {
      let result = await fetch(`http://localhost:3000/users/search/${key}`)
      result = await result.json()
      if (result) {
        setuserList(result)
      }
    } else {
      getListUser();
    }

  }
  if (roleLogin === '"admin"') {
    return (
      <div>

        <div>
        </div>
        <div className="product-list">
          {/* <a> Welcome {JSON.parse(userName).data.userName} <p>ROLE: {JSON.parse(userName).data.role}</p></a> */}


          <div>
            <Card>
              <CardBody>
                <CardTitle tag="h5">User List</CardTitle>
                <Link to="/addUser" className="btn btn-success" style={{ color: 'white', textDecoration: 'underline' }}>
                  Add user
                </Link>

                <input
                  type="text"
                  className="search-product-box"
                  placeholder="Search user"
                  onChange={searchHandle}
                  style={{ border: '1px solid gray', borderRadius: '4px', padding: '5px', marginLeft: '10px' }}
                />

                <Table className="no-wrap mt-3 align-middle" responsive borderless>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>username</th>
                      <th>name</th>

                      <th>role</th>
                      <th>Options</th>

                    </tr>
                  </thead>
                  <tbody>
                    {userList.length > 0 ? (
                      userList.map((item, index) => (
                        <tr key={item._id} className="border-top">
                          <td>
                            <div className="d-flex align-items-center p-2">

                              <div className="ms-3">
                                <h5 className="mb-0">{index + 1}</h5>

                              </div>
                            </div>
                          </td>
                          <td>{item.userName}</td>
                          <td>{item.name}</td>

                          <td>
                            {item.role}
                          </td>
                          <td>
                            <button className="btn btn-danger" style={{ color: 'white', textDecoration: 'underline' }} onClick={() => deleteUser(item._id)}>Delete</button>
                            <Link className="btn btn-primary" style={{ color: 'white', textDecoration: 'underline' ,marginLeft:'5px'}} to={`/users/${item._id}`}>Update</Link>
                          </td>
                        </tr>
                      ))) : (
                      <h1>No Result Found</h1>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>

        </div>
      </div>


    );
  }
  if (roleLogin === '"publisher"' || roleLogin === '"user"') {
    return (
      <div>

        <div>
        </div>
        <div className="product-list">


          <div>
            <Card>
              <CardBody>
                <CardTitle tag="h5">Class List </CardTitle>
                <Link to="/addClass"  className="btn btn-success" style={{ color: 'white', textDecoration: 'underline' }}>Add class</Link>

                <input type="text"className="search-product-box"
                  placeholder="Search class"
                
                  style={{ border: '1px solid gray', borderRadius: '4px', padding: '5px', marginLeft: '10px' }} onChange={searchClassHandle} />

                <Table className="no-wrap mt-3 align-middle" responsive borderless>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Class name</th>

                      <th>Teacher name</th>
                      <th>Options</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {classList.length > 0 ? (
                      classList.map((item, index) => (
                        <tr key={item._id} className="border-top">
                          <td>
                            <div className="d-flex align-items-center p-2">

                              <div className="ms-3">
                                <h5 className="mb-0">{index + 1}</h5>

                              </div>
                            </div>
                          </td>
                          <td>{item.name}</td>
                          <td>
                            {item.teacherName}
                          </td>
                          <td> <button className="btn btn-danger" style={{ color: 'white', textDecoration: 'underline' }} onClick={() => deleteClassRoom(item._id)}>Delete</button> 
                        

                            <Link className="btn btn-primary" style={{ color: 'white', textDecoration: 'underline' ,marginLeft:'5px'}} to={`/class/${item._id}`}>Update</Link>
                           
                            <Link  className="btn btn-info"  style={{ color: 'white', textDecoration: 'underline' ,marginLeft:'5px'}} to={`/class/detailClass/${item._id}`}>Class detail</Link>

                          </td>
                        </tr>
                      ))) : (
                      <h1>No Result Found</h1>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>

        </div>
      </div>


    );
  }




};

export default ProjectTables;
