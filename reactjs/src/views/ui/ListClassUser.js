import { Card, CardBody, CardTitle,  Table } from "reactstrap";
import React, {  useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const ListClassUser = () => {


  const [userName, setuserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('');
  const [userList, setuserList] = React.useState('');
  const [detailClassUser, setDetailClassUser] = React.useState('');

 
  const params = useParams();

  const roleLogin = localStorage.getItem('role')

  const auth = localStorage.getItem('user')
  const token = JSON.parse(auth).data;
  useEffect(() => {
 
 
    
    getUserDetails();
    getClassOfUser();
  }, [])
 
 
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
 
  const searchClassHandle = async (e) => {
    let key = e.target.value
    if (key) {
      let result = await fetch(`http://localhost:3000/class/search/${params.id}/${key}`)


      result = await result.json()
      if (result) {
        setDetailClassUser(result)
      }
    } else {
        getClassOfUser();
    }
  }
 
  const getClassOfUser = async () => {
    try {
      const result = await fetch(`http://localhost:3000/class/classUser/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (result.ok) {
        const data = await result.json();
        // alert(params.id)
        // const productList = data.productList;
        // alert(data.data);
      
        setDetailClassUser(data.data);
        // localStorage.setItem('idClass', params.id);

        // localStorage.setItem('userName', JSON.stringify(data)); 
      } else {
        const data = await result.json();

        // alert('Failed to get class');
        // alert(data.data)
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };


  if (roleLogin === '"user"') {
    return (
      <div>

        <div>
        </div>
        <div className="product-list">


          <div>
            <Card>
              <CardBody>
                <CardTitle tag="h5" > <b>Class List</b> </CardTitle>
                {/* <Link to="/addClass" className="btn btn-success" style={{ color: 'white', textDecoration: 'underline' }}>Add class</Link> */}

                <input type="text" className="search-product-box"
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
                    {detailClassUser.length > 0 ? (
                      detailClassUser.map((item, index) => (
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
                          <td>
                            {/* <button className="btn btn-danger" style={{ color: 'white', textDecoration: 'underline' }} onClick={() => deleteClassRoom(item._id)}>Delete</button> */}
                            <Link className="btn btn-primary" style={{ color: 'white', textDecoration: 'underline', marginLeft: '5px' }} to={`/class/${item._id}`}>Update</Link>
                            <Link className="btn btn-info" style={{ color: 'white', textDecoration: 'underline', marginLeft: '5px' }} to={`/class/detailClass/${item._id}`}>Class detail</Link>

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

export default ListClassUser;
