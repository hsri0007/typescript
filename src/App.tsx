import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage/homepage";
import { Auth0Provider } from "@auth0/auth0-react";
import Header from "./component/header/header";
import PathsdetailsPage from "./pages/pathsdetailspage/pathsdetailspage";

const App: React.FC = () => {
  return (
    <Auth0Provider
      domain={`${process.env.REACT_APP_DOMAIN}`}
      clientId={`${process.env.REACT_APP_CLIENT_ID}`}
      redirectUri={window.location.origin}
      audience={process.env.REACT_APP_AUDIENCE}
      onRedirectCallback={() => {
        if (window.localStorage.prevurl) {
          return (window.location.href = window.localStorage.prevurl);
        }
        window.location.href = "/";
      }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/path-details/:id" element={<PathsdetailsPage />} />
      </Routes>
    </Auth0Provider>
  );
};

export default App;
