import React from 'react';
import Loader from './Loader';

const Layout = ({ children, isLoading }) => {
  return (
    <div>
      {isLoading && <Loader />}
      {children}
    </div>
  );
};

export default Layout;