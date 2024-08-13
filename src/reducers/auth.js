const authReducer = (state = { data: null }, action) => {
  // console.log("ac", action, "da", state);
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("Profile", JSON.stringify({ ...action?.data }));
      return { ...state, data: action?.data };
    case "LOGOUT":
      localStorage.clear();
      return { ...state, data: null };
    case "PASSWORD":
      return { ...state, data: action?.data };
    case "RESET_PASSWORD":
      return { ...state, data: action?.data };
    case "SEND_OTP":
      return { ...state, data: action?.data };
    case "SEND_CODE":
      return { ...state, data: action?.data };
    default:
      return state;
  }
};
export default authReducer;
