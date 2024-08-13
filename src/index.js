import React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import Reducers from "./reducers";
// import translation_en from "./assets/locales/en/translation.json";
// import translation_es from "./assets/locales/es/translation.json";
// import translation_fr from "./assets/locales/fr/translation.json";
import i18n from "i18next";
// import { I18nextProvider } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "fr", "hi", "es", "pt", "zh"],
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["cookie", "localStorage", "htmltag", "path", "subdomain"],
      caches: ["cookie", "localStorage"],
    },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
    react: { useSuspense: false },
  });
// i18next.init({
//   resources: {
//     en: {
//       translation: translation_en,
//     },
//     es: {
//       translation: translation_es,
//     },
//     fr: {
//       translation: translation_fr,
//     },
//   },
// });
const store = createStore(Reducers, compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      {/* <I18nextProvider i18n={i18next}> */}
      <App />
      {/* </I18nextProvider> */}
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
