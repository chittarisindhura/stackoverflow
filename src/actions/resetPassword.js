import * as api from "../api";

export const resetPassword = (passwordData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.resetPassword(passwordData);
    navigate("/resetPassword");
  } catch (error) {
    console.log(error);
  }
};
