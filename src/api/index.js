import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://stackoverflow-server-three.vercel.app/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);

export const postQuestion = (questionData) =>
  API.post("/questions/Ask", questionData);
export const getAllQuestions = () => API.get("/questions/get");
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value) =>
  API.patch(`/questions/vote/${id}`, { value });

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered) =>
  API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered });
export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });

export const getAllUsers = () => API.get("/user/getAllUsers");
export const updateProfile = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData);
export const forgotPassword = (authData) =>
  API.post("/user/forgotPassword", authData);
export const resetPassword = (id, token, updateData) =>
  API.patch(`/user/resetPassword/${id}/${token}`, id, token, updateData);
export const sendOtpVerificationEmail = (otpVerificationData) =>
  API.post("/user/sendOtp", otpVerificationData);
export const verifyOtpData = (otpVerificationData) =>
  API.post(`/user/verifyOtp`, otpVerificationData);
export const sendMobileCode = (otpVerificationData) =>
  API.post(`/user/sendMobile`, otpVerificationData);
export const verifyMobileCode = (otpVerificationData) =>
  API.post(`/user/verifyCode`, otpVerificationData);
