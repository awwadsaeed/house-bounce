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
import { green ,blue } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
//#56BD94
//#3A7BB8
//#27AE60

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

export default function RequestFrom() {
  const [type, setType] = useState("House");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [negotiable, setNegotiable] = useState("No");

  const context = useContext(userContext);

  const handleNegotiable = (event) => {
    console.log(event.target.checked);
    if (event.target.checked) {
      setNegotiable("Yes");
    } else {
      setNegotiable("No");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const address = `${city} - ${street}`;
    const finalPrice = `${price} JD`;
    context.createHouseReq(type, address, description, finalPrice, negotiable);
  };

  return (
    <div className="create">
      <div className="title">Sell A House</div>
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
          label="City"
          placeholder="City"
          variant="outlined"
          id="custom-css-outlined-input"
          //   variant="outlined"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <ValidationTextField
          required
          id="standard-required"
          label="Street"
          placeholder="Street"
          variant="outlined"
          onChange={(e) => {
            setStreet(e.target.value);
          }}
        />
        <ValidationTextField
          required
          id="standard-required"
          multiline
          minRows={4}
          maxRows={4}
          label="description"
          placeholder="How many rooms, View etc..."
          variant="outlined"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <ValidationTextField
          required
          type="number"
          id="standard-password-input"
          label="Price"
          placeholder="Price"
          variant="outlined"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
          <span className="selec">
        <FormControl sx={{ width: "96%", marginLeft: "2%" }}>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Type"
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <MenuItem value={"House"}>House</MenuItem>
              <MenuItem value={"Appartment"}>Appartment</MenuItem>
            </Select>
        </FormControl>
          </span>
        <div className="checky">
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: blue[900],
                  "&.Mui-checked": {
                    color: green[600],
                  },
                }}
                onChange={(e) => {
                  handleNegotiable(e);
                }}
              />
            }
            label="Negotiable"
            labelPlacement="end"
          />
        </div>
        <Button color="success" variant="contained" type="submit">
          Send Details
        </Button>
      </Box>
    </div>
  );
}
