import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getUserTokenFromLocalStorage,
  removeDataFromToStorage,
  setDataFromToStorage,
} from "../../helpers/helpers";

export default function AuthGuard({ children }: any) {
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
        setDataFromToStorage("usertoken", data);
        if (res) {
          setState({ ...user, token: res });
        }
      });
    }
  }, [isAuthenticated, getAccessTokenSilently, user]);

  React.useEffect(() => {
    const handlefunction = async () => {
      let data: any = await getUserTokenFromLocalStorage();

      if (data === JSON.stringify("checking")) {
        await loginWithRedirect();
        setDataFromToStorage("usertoken", JSON.stringify("checking....."));
      }

      if (data) {
        const parseddata = JSON.parse(JSON.stringify(data))
        setState(parseddata);
      }
    };

    handlefunction();
  }, [loginWithRedirect]);

  React.useEffect(() => {
    const handlefunction = async () => {
      const data = await getUserTokenFromLocalStorage();
      if (!data) {
        if (!isAuthenticated) {
          loginWithRedirect();
          setDataFromToStorage("usertoken", JSON.stringify("checking"));
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
    removeDataFromToStorage("usertoken");
    logout({ returnTo: window.location.origin });
    setDataFromToStorage("prevurl", window.location.pathname);
  };

  const data = {
    handleLogout,
    state,
    loginWithRedirect,
  };

  return <div>{children(data)}</div>;
}
