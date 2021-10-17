import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { userContext } from "../../context/UserContext";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function LoginForm() {
  const context = useContext(userContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("seller");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      email !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      role !== ""
    ) {
      context.signup(email, password, firstName, lastName, role);
    }
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const onLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const onRoleChange = (e) => {
    console.log(e.target.value);
    setRole(e.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <TextField
        required
        id="standard-required"
        label="Email"
        placeholder="Email"
        variant="standard"
        onChange={(e) => {
          onEmailChange(e);
        }}
      />
      <TextField
        required
        id="standard-password-input"
        label="Password"
        type="password"
        placeholder="Password"
        variant="standard"
        onChange={(e) => {
          onPasswordChange(e);
        }}
      />
      <TextField
        required
        id="standard-required"
        label="First Name"
        placeholder="Email"
        variant="standard"
        onChange={(e) => {
          onFirstNameChange(e);
        }}
      />
      <TextField
        required
        id="standard-required"
        label="Last Name"
        placeholder="Email"
        variant="standard"
        onChange={(e) => {
          onLastNameChange(e);
        }}
      />
      <FormControl >
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          label="Age"
          onChange={(e) => {
            onRoleChange(e);
          }}
        >
          <MenuItem value={"admin"}>Admin</MenuItem>
          <MenuItem value={"seller"}>Seller</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit">Sign up</Button>
    </Box>
  );
}
