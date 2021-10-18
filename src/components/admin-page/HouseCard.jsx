import React, { useContext } from "react";
import { userContext } from "../../context/UserContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


export default function HouseCard(props) {
  const context = useContext(userContext);
    const updateStat = (value)=>{
        context.updateStatus(props.house._id,props.house.ownerEmail,value)
    }
  return <Card>
  <CardContent>
    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
      Owner: {props.house.ownerName}
    </Typography>
    <Typography variant="body2" component="div">
      Contact Info: {props.house.ownerEmail}
    </Typography>
    <Typography sx={{ mb: 1.5 }} color="text.secondary">
      Type: {props.house.type}
    </Typography>
    <Typography variant="body2">Address: {props.house.address}.st</Typography>
    <Typography variant="body2">
      Description: {props.house.description}
    </Typography>
    <Typography variant="body2">Status: {props.house.status}</Typography>
    <Typography variant="body2">Price: {props.house.sellingPrice}</Typography>
    <Typography variant="body2">Negotiabile: {props.house.negotiable}</Typography>
  </CardContent>
  <CardActions>
    <Button size="small" onClick={()=>{context.deleteHouse(props.house._id,props.house.ownerEmail)}}>Delete</Button>
    <Button size="small"  onClick={()=>{updateStat('Accepted')}}>Accept</Button>
    <Button size="small"  onClick={()=>{updateStat('Regected')}}>Regect</Button>
  </CardActions>
</Card>;
}
