import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup, forgotPassword } from "../../actions/auth";
import "./password.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (signup) {
      dispatch(forgotPassword({ email }));
      navigate("/Auth");
    }
  };

  return (
    <div className=" container1 bg-secondary vh-100">
      <div className="container2 bg-white p-3 rounded w-25">
        <h2>Forgot Password</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="container mb-3">
            <label id="email" htmlFor="email">
              <strong>Enter Email</strong>
            </label>
            <br />
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              value={email}
              maxLength="30"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <button className="btn" type="submit">
              send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword;
