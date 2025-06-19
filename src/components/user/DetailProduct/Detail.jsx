import React from "react";
import Navbar from "../../layouts/user/Navbar";
import Subnav from "../../layouts/user/Subnav";
import Breadcrumb from "./Breadcrumb";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";
import Footer from "../../layouts/user/Footer";

const Detail = () => {
  return (
    <div>
      <Navbar />
      <Subnav />
      <Breadcrumb />
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <LeftContent />
        </div>

        <div className="lg:col-span-2">
          <RightContent />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Detail;
