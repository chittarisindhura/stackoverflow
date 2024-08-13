const otpVerificationReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "VERIFY_OTP":
      return { ...state, data: action.payload };
    case "VERIFY_CODE":
      return { ...state, data: action?.data };
    default:
      return state;
  }
};
export default otpVerificationReducer;
