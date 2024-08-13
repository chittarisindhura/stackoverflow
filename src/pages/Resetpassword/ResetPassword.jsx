import React, { useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup, resetPassword } from "../../actions/auth";
import "./password.css";
const ResetPassword = () => {
  const { id, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPassword && !confirmPassword) {
      alert("Enter  password and confirm password");
    }
    if (newPassword !== confirmPassword) {
      alert("password and confirm Password should be same");
    } else if (signup) {
      dispatch(resetPassword({ id, token, password: confirmPassword }));
      navigate("/Auth");
    }
  };
  return (
    <div className="container1">
      <div className="container2">
        <form onSubmit={handleSubmit}>
          <h2>Reset Password</h2>
          <label htmlFor="password">
            <strong>Enter New Password</strong>
          </label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={newPassword}
            className="form-control"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <br />
          <label htmlFor="newpassword">
            <strong>Enter Confirm Password</strong>
          </label>
          <br />
          <input
            type="password"
            name="newpassword"
            id="newpassword"
            placeholder="Enter confirm password"
            value={confirmPassword}
            className="form-control"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <br />
          <button className="btn" type="submit">
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};
export default ResetPassword;
