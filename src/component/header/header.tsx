import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();
  const [state, setState] = React.useState<any>({});

  const history = useNavigate();

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
      if (!data) {
        if (!isAuthenticated) {
          await loginWithRedirect();
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

  const handleMenu: (event: any) => void = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose: () => void = () => {
    setAnchorEl(null);
  };

  const handleLogout: () => void = () => {
    window.localStorage.removeItem("usertoken");
    logout({ returnTo: window.location.origin });
    window.localStorage.setItem("prevurl", window.location.pathname);
    // window?.localStorage?.clear()
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <img
                src="/logo.svg"
                height="45px"
                alt="headversity"
                onClick={() => history("/")}
                style={{ cursor: "pointer" }}
              />
            </Typography>
          }
          <Typography
            style={{ cursor: "pointer" }}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => history("/")}
          ></Typography>
          {!state?.token && (
            <div>
              <Button
                variant="outlined"
                color="primary"
                style={{ color: "white" }}
                onClick={() => loginWithRedirect()}
              >
                Login
              </Button>
            </div>
          )}
          {state?.token && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>{state.name}</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
