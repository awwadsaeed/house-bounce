import React,{useState,useContext} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import  {userContext} from '../../context/UserContext';


export default function LoginForm() {

    const context = useContext(userContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        context.login(email,password);
    }
    const onEmailChange = (e)=>{
        setEmail(e.target.value);
    }
    const onPasswordChange = (e)=>{
        setPassword(e.target.value);
    }


  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit ={(e)=>{handleSubmit(e)}}
    >
      <TextField
        required
        id="standard-required"
        label="Email"
        placeholder="Email"
        variant="standard"
        onChange={(e)=>{onEmailChange(e)}}
      />
      <TextField
        required
        id="standard-password-input"
        label="Password"
        type="password"
        placeholder="Password"
        variant="standard"
        onChange={(e)=>{onPasswordChange(e)}}
      />
      <Button type='submit' >Login</Button>
    </Box>
  );
}

