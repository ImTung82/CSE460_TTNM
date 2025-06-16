import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../../layouts/user/Navbar";
import Subnav from "../../layouts/user/Subnav";
const Home = () => {

  return (
    <>
        <Navbar />
        <Subnav />
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
        </div>
    </>
  );
};

export default Home;