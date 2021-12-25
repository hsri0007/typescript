import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Button } from "@mui/material";
import Authguard from "../../guards/Authguard/Authguard";
import { useNavigate } from "react-router-dom";
import { RedirectLoginOptions } from "@auth0/auth0-react";

interface authprops {
  handleLogout: () => void;
  state: any;
  loginWithRedirect: (options?: RedirectLoginOptions | undefined) => Promise<void>;
}

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useNavigate();
  const handleMenu : (event: any) => void = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose: () => void = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Authguard>
        {(data: authprops) => (
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed"  >
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
                {!data.state?.token && (
                  <div>
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ color: "white" }}
                      onClick={() => data.loginWithRedirect()}
                    >
                      Login
                    </Button>
                  </div>
                )}
                {data.state?.token && (
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
                      <MenuItem onClick={handleClose}>
                        {data.state.name}
                      </MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={() => data.handleLogout()}>
                        Logout
                      </MenuItem>
                    </Menu>
                  </div>
                )}
              </Toolbar>
            </AppBar>
          </Box>
        )}
      </Authguard>
    </div>
  );
};

export default Header;
