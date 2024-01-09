import { Card, CardBody, CardTitle,  Table } from "reactstrap";
import React, {  useEffect } from 'react'
import {  Link } from 'react-router-dom'

const TeacherList = () => {


  const [userName, setuserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('');
  const [userList, setuserList] = React.useState('');

 

  const roleLogin = localStorage.getItem('role')

  const auth = localStorage.getItem('user')
  const token = JSON.parse(auth).data;
  useEffect(() => {
 
 
    getListUser();
    getUserDetails();
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
        alert('Failed to get userList');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };
 
  const searchHandle = async (e) => {
    let key = e.target.value
    if (key) {
      let result = await fetch(`http://localhost:3000/users/searchUsers/${key}`)
      result = await result.json()
      if (result) {
        setuserList(result)
      }
    } else {
      getListUser();
    }

  }
  if (roleLogin === '"user"') {
    return (
      <div className="product">
        <h1>Ban khong du quyen.</h1>
      </div>
    );
  }
    return (
      <div>

        <div>
        </div>
        <div className="product-list">

          <div>
            <Card>
              <CardBody>
                <CardTitle tag="h5">Teacher List</CardTitle>
                <input
                  type="text"
                  className="search-product-box"
                  placeholder="Search teacher"
                  onChange={searchHandle}
                  style={{ border: '1px solid gray', borderRadius: '4px', padding: '5px', marginLeft: '10px' }}
                />

                <Table className="no-wrap mt-3 align-middle" responsive borderless>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Teacher name</th>
                      <th>Email</th>
 
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
                           <td>{item.name}</td>

                          <td>
                            {item.email}
                          </td>
                          <td>
                           

                            {role === 'admin' ? (
  <>
     <button className="btn btn-danger" style={{ color: 'white', textDecoration: 'underline' }} onClick={() => deleteUser(item._id)}>Delete</button>
     <Link className="btn btn-primary" style={{ color: 'white', textDecoration: 'underline' ,marginLeft:'5px'}} to={`/users/${item._id}`}>Update</Link>
                          
  </>
) : role === 'publisher' ? (
  <>
         <Link className="btn btn-primary" style={{ color: 'white', textDecoration: 'underline' ,marginLeft:'5px'}} to={`/users/${item._id}`}>Update</Link>

  </>
) : <>...</>}

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
  
  




};

export default TeacherList;
