import React from "react";
import "./seller.css";
import RequestFrom from "./RequestFrom";
import MyHouses from "./MyHouses";
export default function SellerPage() {
  return (
    <>
      <div>
        <RequestFrom />
      </div>
      <div className='myhouses'>
        <MyHouses />
      </div>
    </>
  );
}
