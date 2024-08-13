import React from "react";
// import { Routes, Route } from "react-router-dom";
import { Routes, Route } from "react-router";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Questions from "./pages/Questions/Questions";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import DisplayQuestion from "./pages/Questions/DisplayQuestion";
import Tags from "./pages/Tags/Tags";
import Users from "./pages/Users/Users";
import UserProfile from "./pages/UserProfile/UserProfile";
import ResetPassword from "./pages/Resetpassword/ResetPassword";
import ForgotPassword from "./pages/Resetpassword/ForgotPassword";
import { useParams } from "react-router";
import Languages from "./components/Languages/Languages";
import UserLoginHistory from "./pages/UserLogin/UserLoginHistory";
const AllRoutes = ({ slideIn, handleSlideIn }) => {
  const { id, token } = useParams();
  return (
    <Routes>
      <Route
        path="/"
        element={<Home slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route path="/Auth" element={<Auth />} />
      <Route path="/AskQuestion" element={<AskQuestion />} />
      <Route
        path="/Questions"
        element={<Questions slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route
        path="/Questions/:id"
        element={
          <DisplayQuestion slideIn={slideIn} handleSlideIn={handleSlideIn} />
        }
      />
      <Route
        path="/Tags"
        element={<Tags slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route
        path="/Users"
        element={<Users slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      />
      <Route
        path="/Users/:id"
        element={
          <UserProfile slideIn={slideIn} handleSlideIn={handleSlideIn} />
        }
      />
      <Route path="/resetPassword/:id/:token" element={<ResetPassword />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/resetPassword/:id/:token" element={<ResetPassword />} />
      {/* <Route path="/language" element={<Languages />} /> */}
      <Route path="/verifyOtp/:id" element={<Languages />} />
      <Route path="/userHistory" element={<UserLoginHistory />} />
    </Routes>
  );
};

export default AllRoutes;
