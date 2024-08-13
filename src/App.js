import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";
import { setCurrentUser } from "./actions/currentUser";
import { useTranslation } from "react-i18next";
import { Box, TextField, Typography } from "@mui/material";
import { t } from "i18next";

function App() {
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("translation");
  const currentUser = useSelector((state) => state.currentUserReducer);

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const [slideIn, setSlideIn] = useState(true);
  useEffect(() => {
    if (window.innerWidth <= 760) {
      setSlideIn(false);
    }
    i18n.changeLanguage("en");
  }, []);

  const handleSlideIn = () => {
    if (window.innerWidth <= 760) {
      setSlideIn((state) => !state);
    }
  };
 
  return (
    <div className="App">
      <Router>
        {/* <Box> */}
        {/* <Typography variant="caption" align="left"> */}
        {/* {t("welcome_msg")} */}

        <Navbar handleSlideIn={handleSlideIn} />
        <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn} />
        {/* </Typography> */}
        {/* </Box> */}
      </Router>
    </div>
  );
}

export default App;
