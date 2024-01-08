import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuthorization = (allowedRoles) => (WrappedComponent) => {
  const WithAuthorization = (props) => {
    const role = localStorage.getItem('role');

    if (role==='admin') {
      return <WrappedComponent {...props} />;
    } else {
      return <Navigate to="/home" />;
    }
  };

  return WithAuthorization;
};

export default withAuthorization;