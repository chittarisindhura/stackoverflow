import * as api from "../api";
export const sendOtp = (otpVerificationData) => async (dispatch) => {
  try {
    const { data } = await api.sendOtpVerificationEmail(otpVerificationData);
    // console.log(data);
    dispatch({ type: "SEND_OTP", data });
  } catch (error) {
    console.log(error);
  }
};
export const verifyOtp = (id, otpVerificationData) => async (dispatch) => {
  try {
    const { data } = await api.verifyOtpData(id, otpVerificationData);
    console.log("verify", data);
    dispatch({ type: "VERIFY_OTP", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const sendCode = (otpVerificationData) => async (dispatch) => {
  try {
    const { data } = await api.sendMobileCode(otpVerificationData);
    dispatch({ type: "SEND_CODE" }, data);
  } catch (error) {
    console.log(error);
  }
};
export const verifyCode = (otpVerificationData) => async (dispatch) => {
  try {
    const { data } = await api.verifyMobileCode(otpVerificationData);
    dispatch({ type: "VERIFY_CODE" }, data);
  } catch (error) {
    console.log(error);
  }
};
