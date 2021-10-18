import "./login.css";
import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { userContext } from "../../context/UserContext";
import { styled } from "@mui/material/styles";


const ValidationTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "darkblue",
    },
    "&:hover fieldset": {
      borderColor: "darkblue",
    },
    "&.Mui-focused fieldset": {
      borderColor: "blue",
    },
  },
});



export default function LoginForm() {
  const context = useContext(userContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      context.login(email, password);
    }
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };


  return (
    <div className="loginForm">
      <div className="title">Sign In</div>
   
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "96%" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <ValidationTextField
            required
            id="standard-required"
            label="Email"
            placeholder="Email"
            variant="outlined"
            onChange={(e) => {
              onEmailChange(e);
            }}
          />
          <ValidationTextField
            required
            id="standard-password-input"
            label="Password"
            type="password"
            placeholder="Password"
            variant="outlined"
            onChange={(e) => {
              onPasswordChange(e);
            }}
          />
          <Button type="submit" color="success" variant="contained">
            Login
          </Button>
        </Box>
 
    </div>
  );
}
