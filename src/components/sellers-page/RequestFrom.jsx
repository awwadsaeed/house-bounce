import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { userContext } from "../../context/UserContext";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from '@mui/material/FormControlLabel';
//#56BD94
//#3A7BB8
//#27AE60

const ValidationTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "red",
    },
    "&:hover fieldset": {
      borderColor: "green",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
});

export default function RequestFrom() {

  const [type, setType] = useState("House");
  const [city,setCity] = useState('');
  const [street,setStreet] = useState('');
  const [description,setDescription] = useState('');
  const [price,setPrice] = useState('');
  const [negotiable,setNegotiable] = useState('No');

  const context = useContext(userContext);

    const handleNegotiable = (event)=>{
        console.log(event.target.checked);
        if(event.target.checked){
            setNegotiable('Yes');
        }else{
            setNegotiable('No');
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const address = `${city} - ${street}`;
        const finalPrice = `${price}$`
        context.createHouseReq(type,address,description,finalPrice,negotiable);
    }


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
      <ValidationTextField
        required
        id="standard-required"
        label="City"
        placeholder="City"
        variant="standard"
        id="custom-css-outlined-input"
        //   variant="outlined"
        onChange={(e) => {
          setCity(e.target.value);
        }}
      />
      <TextField
        required
        id="standard-required"
        label="Street"
        placeholder="Street"
        variant="standard"
        onChange={(e) => {
          setStreet(e.target.value);
        }}
      />
      <TextField
        required
        id="standard-required"
        multiline
        minRows={4}
        label="description"
        placeholder="How many rooms, View etc..."
        variant="standard"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <TextField
        required
        type="number"
        id="standard-password-input"
        label="Price"
        placeholder="Price"
        variant="standard"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <FormControl>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Age"
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <MenuItem value={"House"}>House</MenuItem>
          <MenuItem value={"Appartment"}>Appartment</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            sx={{
              color: green[800],
              "&.Mui-checked": {
                color: green[600],
              },
            }}
            onChange={(e)=>{handleNegotiable(e)}}
          />
        }
        label="Negotiable"
        labelPlacement="end"
      />
      <Button type="submit">Login</Button>
    </Box>
  );
}
