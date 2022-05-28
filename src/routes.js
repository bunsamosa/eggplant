import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import txnInfo from "./components/txnInfo";


function index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/txninfo' element={txnInfo()} />
        <Route render={() => <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default index;