import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useCookies } from "react-cookie";
import i18next from "i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  sendOtp,
  verifyOtp,
  sendCode,
  verifyCode,
} from "../../actions/otpVerification.js";
import { useNavigate, useParams } from "react-router";

import "./Languages.css";

const lngs = [
  {
    code: "en",
    name: "English",
    country_code: "gb",
    bgcolor: "white",
  },
  {
    code: "fr",
    name: "French",
    country_code: "fr",
    bgcolor: "yellow",
  },
  { code: "es", name: "Spanish", country_code: "es", bgcolor: "white" },
  { code: "hi", name: "Hindi", country_code: "in", bgcolor: "blue" },
  { code: "pt", name: "portuguese", country_code: "pt", bgcolor: "white" },
  { code: "zh", name: "chinese", country_code: "cn", bgcolor: "green" },
];
const styles = {
  mainDiv: {
    zIndex: 1,
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    overFlow: "hidden",
    textAlign: "center",
    backgroundColor: "rgb(0,0,0,0.4)",
    display: "flex",
    flexDirection: "column",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 500,
    height: 50,
    margin: 10,
    fontSize: 15,
    borderRadius: 5,
    fontFamily: "Arial",
  },
  verifyBtn: {
    width: 500,
    height: 50,
    backgroundColor: "purple",
    color: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    fontWeight: "bold",
    fontFamily: "Sans-Serif",
  },
};
export default function Languages() {
  const { id } = useParams();
  const [cookies] = useCookies(["i18next"]);
  const [selectedLanguage, setSelectedLanguage] = useState(
    () => cookies?.i18next || "en"
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [sendText, setSendText] = useState(false);
  const [enterEmail, setEnterEmail] = useState("");
  const [otpValue, setOtpValue] = useState([]);
  const [verifyText, setVerifyText] = useState([]);
  const [click, setClick] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const [code, setCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const showHideClassName = show ? "modal d-block" : "modal d-none";
  const showOtp = sendText ? "modal-otp d-block" : "modal-otp d-none";
  const showHideMobile = showMobile ? "d-block" : "d-none";
  let usercd = useSelector((state) => state.currentUserReducer);

  let userc = usercd && usercd.result;

  let otpupdate = useSelector((state) => state.otpVerificationReducer);
  let verifyClass =
    otpupdate && otpupdate.data && otpupdate.data.status === "verified"
      ? "verifySuccess"
      : "verifyFailed";

  useEffect(() => {
    showText();
  }, [otpupdate, click]);

  function showText() {
    let data2 = otpupdate && otpupdate.data ? otpupdate.data.status : "";
    let message =
      otpupdate && otpupdate.data ? otpupdate.data.message : "invalid otp";
    let invalid = otpupdate.data ? otpupdate.data : "";
    setTimeout(() => {
      if (data2 === "verified") {
        i18next.changeLanguage("es");
        setSelectedLanguage("es");
        setVerifyText([...verifyText, message]);
      } else if (click && (invalid === "null" || invalid === "")) {
        setVerifyText([...verifyText, message]);
      }
    }, 5000);
  }
  const translate = (x) => {
    i18next.changeLanguage(x);
    setSelectedLanguage(x);
  };
  const changeLng = (e) => {
    if (e.target.value !== "es" && e.target.value !== "fr") {
      translate(e.target.value);
    }
    lngs.forEach((lng) => {
      let col = "";
      if (e.target.value === lng.code) {
        col = lng.bgcolor;
        document.body.style.background = col;
      }
    });
    const optes = document.getElementById("es");
    if (e.target.value === "es" && userc && !userc.verified) {
      const otp_inputs = document.querySelectorAll(".otp");
      optes.addEventListener("change", showModal());
      otp_inputs.forEach((otp) => {
        otp.addEventListener("keyup", moveNext);
      });

      console.log(e.target.value);
    }
    if (e.target.value === "es" && userc.verified) {
      translate("es");
    }
    const optfr = document.getElementById("fr");
    if (e.target.value === "fr" && userc) {
      translate("fr");
      optfr.addEventListener("change", showMobileModal());
    } else if ((e.target.value === "es" || e.target.value === "fr") && !userc) {
      alert("Login or Signup to translate Language");
      navigate("/auth");
      if (userc && userc.verified) {
        translate(e.target.value);
      }
    }
  };
  const showMobileModal = () => {
    setShowMobile(true);
  };
  const HideMobileModal = () => {
    setShowMobile(false);
  };
  const showModal = () => {
    setShow(true);
  };
  const hideModal = () => {
    setShow(false);
  };
  const sendbtn = () => {
    setSendText(true);
    if (userc) {
      const emailInput = document.querySelector("#email");
      const emailData = emailInput.value;
      if (userc && userc.email === emailData) {
        dispatch(
          sendOtp({
            _id: userc._id,
            email: userc.email,
            enterEmail: emailData,
          })
        );
      }
    }
  };

  const moveNext = (event) => {
    const otp_inputs = document.querySelectorAll(".otp");
    let current = event.target;
    let index = current.classList[1].slice(-1);
    if (event.keyCode === 8 && index > 1) {
      current.previousElementSibling.focus();
    } else if (index < 4) {
      current.nextElementSibling.focus();
    }
    let string = "";
    for (let otp of otp_inputs) {
      let otpv = otp.value;
      string += otpv;
    }
    otpValue.push(string);
  };

  const verifyBtn = () => {
    setClick(true);
    const data = otpValue[otpValue.length - 1];
    if (userc) {
      dispatch(
        verifyOtp({
          id: userc._id,
          otp: data,
        })
      );
    }
  };
  const sendMobileCode = () => {
    if (!userc) {
      navigate("/auth");
    }
    if (userc) {
      dispatch(
        sendCode({
          phoneNumber,
        })
      );
      setCodeSent(true);
    }
  };
  const verifyMobileCode = () => {
    if (userc) {
      dispatch(
        verifyCode({
          phoneNumber: phoneNumber,
          code: code,
        })
      );
    }
  };
  return (
    <>
      <Box>
        <FormControl>
          <Select
            labelId="language-label"
            id="language-select"
            value={selectedLanguage}
            onChange={(e) => changeLng(e)}
          >
            {lngs.map((lng) => (
              <MenuItem
                id={lng.code}
                value={lng.code}
                key={lng.country_code}
                disabled={selectedLanguage === lng.code}
              >
                {lng.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <div className={showHideClassName}>
        <div className="modal-content">
          <button className="close" onClick={hideModal}>
            X
          </button>
          <div className="modal-header">
            <h2 className="heading">
              Email Verification for Spanish Translation
            </h2>
          </div>
          <div className="modal-body">
            <div className="modal-data">
              <label>
                Enter your Email
                <input
                  type="email"
                  id="email"
                  value={enterEmail}
                  onChange={(e) => setEnterEmail(e.target.value)}
                  size="25"
                />
              </label>
              <br />
              <button type="button" className="sendbtn" onClick={sendbtn}>
                Send OTP
              </button>
            </div>
            <div className={showOtp}>
              <p className="sendText">Check your Email for OTP</p>
              <div className="otp_fields">
                <label>Enter OTP</label>
                <input type="number" className="otp otp_1" maxLength="1" />
                <input type="number" className="otp otp_2" maxLength="1" />
                <input type="number" className="otp otp_3" maxLength="1" />
                <input type="number" className="otp otp_4" maxLength="1" />
              </div>{" "}
              <button className="verifybtn" onClick={verifyBtn}>
                Verify
              </button>
            </div>
            <div className="status">
              <p className={verifyClass}>{verifyText}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={showHideMobile}>
        {!codeSent ? (
          <div style={styles.mainDiv}>
            <button onClick={HideMobileModal}>X</button>
            <h2 style={{ margin: 20 }}>Mobile Verification Form</h2>
            <input
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              style={styles.input}
              placeholder="Enter your Phone number with international prefix (+17632736140)"
            />

            <button style={styles.verifyBtn} onClick={sendMobileCode}>
              send
            </button>
          </div>
        ) : (
          <div style={styles.mainDiv}>
            <button onClick={HideMobileModal}>X</button>

            <h1 style={{ masrgin: 20 }}>Code Verification</h1>
            <input
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              style={styles.input}
              placeholder="Enter your Phone number with international prefix (+17632736140)"
            />

            <input
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter your code"
              style={styles.input}
            />
            <button onClick={verifyMobileCode} style={styles.verifyBtn}>
              verifyCode
            </button>
          </div>
        )}
      </div>
    </>
  );
}
