import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "./header.css";
import logo from '../../images/HouseBounce.png';
import { userContext } from "../../context/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
    color: "#144273",
  },
}));

export default function Header() {
  const context = useContext(userContext);

  const classes = useStyles();
  return (
    <div className="header">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className={classes.root}>
            <img src={logo} className='logo' />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
            </Typography>
            {!context.loggedin && (
              <a href="/">
                <Button variant="contained" color="success">
                  Login
                </Button>
              </a>
            )}
            {!context.loggedin && (
              <a id="logout" href="/signup">
                <Button variant="contained" color="success">
                  sign up
                </Button>
              </a>
            )}
            {context.loggedin && (
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  context.logOut();
                }}
              >
                Log out
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
