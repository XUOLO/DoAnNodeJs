import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import Home from "../components/dashboard/Home";
import { Link ,useNavigate} from "react-router-dom";
import React, {useState, useEffect } from 'react'

 

const Starter = () => {
  // const navigate = useNavigate()

  // const auth = localStorage.getItem('user')
  // useEffect(()=>{
  //   if(auth){
  //     navigate('/starter')
  //   }
 
  // },[])
  return (
    <div>
      
      <Row>
        <Col lg="12">
          <Home />
        </Col>
      </Row>
    
    </div>
  );
};

export default Starter;
