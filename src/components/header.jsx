import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store";

const Header = () => {
  const { state, dispatch } = useAuth();

  const navigation = useNavigate();

  const handleClickLogin = () => {
    navigation("/auth");
  };

  const handleRedirect = () => {
    navigation("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigation("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}
            onClick={handleRedirect}>
            News
          </Typography>
          {state.user ? (
            <>
              <Button color='inherit' onClick={handleLogout}>
                LOGOUT
              </Button>
            </>
          ) : (
            <>
              <Button color='inherit' onClick={handleClickLogin}>
                LOGIN
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
