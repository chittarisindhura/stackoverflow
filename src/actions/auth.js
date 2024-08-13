import * as api from "../api";
import { setCurrentUser } from "./currentUser";
import { fetchAllUsers } from "./users";
export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    dispatch(fetchAllUsers());
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    dispatch(fetchAllUsers());
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassword = (authData) => async (dispatch) => {
  try {
    const { data } = await api.forgotPassword(authData);
    dispatch({ type: "PASSWORD", data });
  } catch (error) {
    console.log(error);
  }
};
export const resetPassword = (id, token, updateData) => async (dispatch) => {
  try {
    const { data } = await api.resetPassword(id, token, updateData);
    dispatch({ type: "RESET_PASSWORD", data });
  } catch (error) {
    console.log(error);
  }
};

