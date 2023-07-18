import ThemeProvider from 'react-bootstrap/ThemeProvider'
import React, { Children, useEffect, useState } from "react";
import Navigation from './partials/Navigation';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Outlet } from 'react-router-dom';


const Layout = ({children}) => {
  return (
    <>
      <ThemeProvider>
        <Navigation />
        <Container>
          <Outlet />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Layout;
