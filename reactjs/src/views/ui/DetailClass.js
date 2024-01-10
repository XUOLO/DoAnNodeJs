
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardBody, CardTitle, Table } from "reactstrap";

const ClassDetail = () => {
  const [detailClass, setdetailClass] = useState([]);

  const auth = localStorage.getItem('user')
  const userName = localStorage.getItem('userName')
  const classId = localStorage.getItem('classId')
  const [className, setclassName] = useState([]);

  const token = JSON.parse(auth).data;
  const params = useParams();
  const roleLogin = localStorage.getItem('role')

  useEffect(() => {

    getProducts();

  }, [])
  const getProducts = async () => {
    try {
      const result = await fetch(`http://localhost:3000/class/detailClass/${params.id}`, {
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
        console.log(result);
        setclassName(data.data.name);
        setdetailClass(data.data.student);
        localStorage.setItem('idClass', params.id);

        // localStorage.setItem('userName', JSON.stringify(data)); 
      } else {
        alert('Failed to get products');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  const deleteProduct = async (id) => {
    console.log(id)
    let result = await fetch(`http://localhost:3000/students/delete/${id}`, {
      method: 'Delete',

    })
    result = await result.json();
    if (result) {
      getProducts();
    }
  }
  const convertBinaryToURL = (binaryData) => {
    const base64String = binaryData.buffer.toString('base64');
    return `data:image/png;base64,${base64String}`;
  };
  const searchHandle = async (e) => {
    let key = e.target.value
    if (key) {
      let result = await fetch(`http://localhost:3000/students/search/${params.id}/${key}`)


      result = await result.json()
      if (result) {
        setdetailClass(result)
      }
    } else {
      getProducts()
    }

  }
  const isAdmin = JSON.parse(localStorage.getItem('userName')).data.role === 'admin';
  //  const isUser = JSON.parse(localStorage.getItem('userName')).data.role === 'user';
  const isPublisher = JSON.parse(localStorage.getItem('userName')).data.role === 'publisher';
  const renderOperationButtons = (item) => {
    if (roleLogin === '"admin"' || roleLogin === '"publisher"') {
      return (
        <>
          <button className="btn btn-danger" style={{ color: 'white', textDecoration: 'underline' }} onClick={() => deleteProduct(item._id)}>Delete</button>
          <Link className="btn btn-primary" style={{ color: 'white', textDecoration: 'underline', marginLeft: '5px' }} to={`/students/${item._id}`}>Update</Link>
        </>



      );
    } else {
      return <a>...</a>;
    }
  };
  return (
    <div>

      <div>
      </div>
      <div className="product-list">


        <div>
          <Card>
            <CardBody>
              <CardTitle tag="h5">      <h1>Student list of class {className}  </h1>
              </CardTitle>
              <Link to="/addStudent" className="btn btn-success" style={{ color: 'white', textDecoration: 'underline' }}>Add student</Link>

              <input type="text" className="search-product-box"
                placeholder="Search student"

                style={{ border: '1px solid gray', borderRadius: '4px', padding: '5px', marginLeft: '10px' }} onChange={searchHandle} />

              <Table className="no-wrap mt-3 align-middle" responsive borderless>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Student name</th>
                    {/* <th>Image</th> */}

                    <th>Age</th>
                    <th>Gender</th>
                    <th>Address</th>

                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {detailClass.length > 0 ? (
                    detailClass.map((item, index) => (
                      <tr key={item._id} className="border-top">
                        <td>
                          <div className="d-flex align-items-center p-2">

                            <div className="ms-3">
                              <h5 className="mb-0">{index + 1}</h5>

                            </div>
                          </div>
                        </td>
                        <td>{item.name}</td>
                        {/* <td>       <img src="https://images.freeimages.com/fic/images/icons/977/rrze/720/user_student.png?fmt=webp&w=500" width="50" className="rounded-circle" />   </td> */}
                        <td>
                          {item.age}
                        </td>
                        <td>
                          {item.gender === 'Male' ? (
                            <img
                              src="data:image/png;base64,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"
                              width="50"
                              className="rounded-circle"
                              alt="Male Avatar"
                            />
                          ) : (
                            <img
                              src="data:image/png;base64,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"
                              width="50"
                              className="rounded-circle"
                              alt="Female Avatar"
                            />
                          )}
                        </td>
                        <td>
                          {item.address}
                        </td>
                        <td>   {renderOperationButtons(item)}</td>

                      </tr>
                    ))) : (
                    <h1>No student found</h1>
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
export default ClassDetail;