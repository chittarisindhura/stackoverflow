import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./userHistory.css";
import axios from "axios";
import { useNavigate } from "react-router";

const UserLoginHistory = () => {
  const [ipData, setIpData] = useState();
  let currentUser = useSelector((state) => state.currentUserReducer);
  let navigate = useNavigate();
  let device = window.navigator.userAgentData.mobile;
  let os = window.navigator.appVersion.toLowerCase().indexOf("win", 8);
  let osStr = window.navigator.appVersion.substr(os, 5);
  let browser = [];
  if (window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
    browser.push("Firefox");
  } else if (
    window.navigator.userAgent.toLowerCase().indexOf("edg") &&
    window.navigator.userAgentData.brands[1].brand
      .toLowerCase()
      .indexOf("edge") > -1
  ) {
    browser.push("Microsoft Edge");
  } else if (window.navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
    browser.push("Internet Explorer");
  } else if (
    window.navigator.userAgent.toLowerCase().indexOf("safari") &&
    window.navigator.userAgentData.brands[1].brand
      .toLowerCase()
      .indexOf("safari") > -1
  ) {
    browser.push("safari");
  } else if (
    window.navigator &&
    window.navigator.userAgent.toLowerCase().indexOf("chrome") > -1
  ) {
    browser.push("chrome");
  } else {
    browser.push("not identified");
  }
  useEffect(() => {
    if (!currentUser) {
      alert("Login");
      navigate("/auth");
    }
  }, [currentUser]);

  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    console.log(res.data);
    setIpData(res.data.ip);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <h2>User Login System Details</h2>
      {currentUser ? (
        <div className="systemContainer">
          <p>Browser Type : {browser}</p>
          <p>Device : {!device ? "Desktop" : "Mobile"} </p>
          <p>OS : {osStr}</p>
          <p>
            IP Address :<span id="demo">{ipData ? ipData : "158.127.04"}</span>
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default UserLoginHistory;
