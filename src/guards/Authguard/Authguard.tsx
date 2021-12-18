import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function MenuAppBar({ children }: any) {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();
  const [state, setState] = React.useState<any>({});

  React.useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently({
        audience: `${process.env.REACT_APP_AUDIENCE}`,
      }).then((res) => {
        const data = JSON.stringify({ ...user, token: res });
        window.localStorage.setItem("usertoken", data);
        if (res) {
          setState({ ...user, token: res });
        }
      });
    }
  }, [isAuthenticated, getAccessTokenSilently, user]);

  React.useEffect(() => {
    const handlefunction = async () => {
      const data = await window?.localStorage?.usertoken;

      if (JSON.parse(data) === "checking") {
        loginWithRedirect();
        window.localStorage.setItem("usertoken", JSON.stringify("checking"));
      }

      if (data) {
        const parseddata = JSON.parse(data);
        setState(parseddata);
      }
    };

    handlefunction();
  }, []);

  React.useEffect(() => {
    const handlefunction = async () => {
      const data = await window?.localStorage?.usertoken;
      if (!data) {
        if (!isAuthenticated) {
          loginWithRedirect();
          window.localStorage.setItem("usertoken", JSON.stringify("checking"));
        }
      }

      if (data) {
        const parseddata = JSON.parse(data);
        setState(parseddata);
      }
    };

    handlefunction();
  }, [loginWithRedirect, isAuthenticated]);

  const handleLogout: () => void = () => {
    window.localStorage.removeItem("usertoken");
    logout({ returnTo: window.location.origin });
    window.localStorage.setItem("prevurl", window.location.pathname);
    // window?.localStorage?.clear()
  };

  const data = {
    handleLogout,
    state,
    loginWithRedirect,
  };

  return <div>{children(data)}</div>;
}
