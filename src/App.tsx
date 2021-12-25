import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage/homepage";
import { Auth0Provider } from "@auth0/auth0-react";
import Header from "./components/header/header";
import PathsdetailsPage from "./pages/pathsdetailspage/pathsdetailspage";
import Alert from "@mui/material/Alert";
import Authguard from "./guards/Authguard/Authguard";
import { root, PATH_DETAILS } from "./staticPaths";
import { styled } from '@mui/material/styles';

const App: React.FC = () => {
  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

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
      <Authguard>
        {(data: any) => (
          <>
            {!data?.state?.token ? (
              <Alert severity="info">Checking Authentication Status....</Alert>
            ) : (
              <>
                <Header />
                <Offset/>
                <Routes>
                  <Route path={root} element={<Homepage />} />
                  <Route
                    path={`/${PATH_DETAILS}/:id`}
                    element={<PathsdetailsPage />}
                  />
                </Routes>
              </>
            )}
          </>
        )}
      </Authguard>
    </Auth0Provider>
  );
};

export default App;
