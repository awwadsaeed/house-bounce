import React,{useContext} from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { userContext } from "../../context/UserContext";


const useStyles = makeStyles(theme => ({
    root: {
      background: 'grey',
    }
  }));
  

export default function Header() {

    const context = useContext(userContext);

    const classes = useStyles();
  return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={classes.root}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {!context.loggedin&&<a href="/"><Button color="inherit">Login</Button></a>}
          {!context.loggedin&&<a href="/signup"><Button color="inherit">sign up</Button></a>}
          {context.loggedin&&<Button color="inherit" onClick={()=>{context.logOut()}}>Log out</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
