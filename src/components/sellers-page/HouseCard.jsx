import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { userContext } from "../../context/UserContext";
import UpdatePriceModal from "./updatePriceModal";

export default function HouseCard(props) {
  const context = useContext(userContext);
  const [open, setOpen] = useState(false);
  return (
    <div className='houseCard'>
      <Card style={{ border:'solid 1px darkblue',margin:5,backgroundColor:'rgb(255,255,255,0.0)'}}>
        <CardContent>
          <div style={{width:'40%',display:'inline-block'}}>
          <Typography sx={{ mb: 0.8 }} >
            Owner: {props.house.ownerName}
          </Typography>
          <Typography sx={{ mb: 0.8 }}>
            Contact Info: {props.house.ownerEmail}
          </Typography>
          <Typography sx={{ mb: 0.8 }}>
            Type: {props.house.type}
          </Typography>
          <Typography sx={{ mb: 0.8 }}>
            Address: {props.house.address}.st
          </Typography>
          <Typography sx={{ mb: 0.8 }}>
          Status:<span className={props.house.status}> {props.house.status}</span></Typography>
          <Typography sx={{ mb: 0.8 }}>
            Price: <span className='Pending'>{props.house.sellingPrice}</span>
          </Typography>
          <Typography sx={{ mb: 0.8 }}>
            Negotiabile: <span className={props.house.negotiable=='Yes'?'Accepted':'Regected'}>{props.house.negotiable}</span>
          </Typography>
          </div>
          <div className="description">
          <Typography sx={{ mb: 0.8 }}>
           <span style={{fontWeight:'bold'}}> Description:</span> <br></br>{props.house.description}
          </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            onClick={() => {
              setOpen(true);
            }}
          >
            Update Price
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => {
              context.deleteHouse(props.house._id, props.house.ownerEmail);
            }}
          >
            Delete
          </Button>
        </CardActions>
        <UpdatePriceModal
          open={open}
          setOpen={setOpen}
          price={props.house.sellingPrice}
          id={props.house._id}
        />
      </Card>
    </div>
  );
}
