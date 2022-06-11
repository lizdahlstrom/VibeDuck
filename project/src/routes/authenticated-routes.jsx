import React, { useContext, useEffect } from 'react';
import { Route } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router';

const AuthenticatedRoutes = () => {
  const [accessToken] =
    useContext(AuthContext);

  return accessToken ? <Outlet /> : <Navigate to='/login' />;
};

export default AuthenticatedRoutes;
