import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "./HomeMainbar.css";
import QuestionList from "./QuestionList";

const HomeMainbar = () => {
  const [t, i18n] = useTranslation();
  const location = useLocation();
  const user = 1;
  const navigate = useNavigate();
  const questionsList = useSelector((state) => state.questionsReducer);
  const checkAuth = () => {
    if (user === null) {
      alert("login or signup to ask a question");
      navigate("/Auth");
    } else {
      navigate("/AskQuestion");
    }
  };
  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {/* <Select
          placeholder="Select target language"
          onChange={(e) => setTargetLang(e.target.value)}
          key="target-lang"
          value={targetLang}
          flexBasis={{ base: "100%", md: "48%" }}
        >
          <LanguagesSelect />
        </Select> */}

        {location.pathname === "/" ? (
          <h1>{t("TopQuestions")}</h1>
        ) : (
          <h1>{t("AllQuestions")}</h1>
        )}
        <button onClick={checkAuth} className="ask-btn">
          {t("home.Ask_Question")}
        </button>
      </div>
      <div>
        {questionsList.data === null ? (
          <h1>{t("Loading...")}</h1>
        ) : (
          <>
            <p>
              {questionsList.data.length} {t("questions")}
            </p>
            <QuestionList questionsList={questionsList.data} />
          </>
        )}
      </div>
    </div>
  );
};
export default HomeMainbar;
