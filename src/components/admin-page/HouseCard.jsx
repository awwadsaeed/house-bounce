import React, { useContext } from "react";
import { userContext } from "../../context/UserContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function HouseCard(props) {
  const context = useContext(userContext);
  const updateStat = (value) => {
    context.updateStatus(props.house._id, props.house.ownerEmail, value);
  };
  return (
    <div className="houseCard">
      <Card
        style={{
          border: "solid 1px darkblue",
          margin: 5,
          backgroundColor: "rgb(255,255,255,0.0)",
        }}
      >
        <CardContent>
          <div style={{ width: "40%", display: "inline-block" }}>
            <Typography sx={{ mb: 0.8 }}>
              Owner: {props.house.ownerName}
            </Typography>
            <Typography sx={{ mb: 0.8 }}>
              Contact Info: {props.house.ownerEmail}
            </Typography>
            <Typography sx={{ mb: 0.8 }}>Type: {props.house.type}</Typography>
            <Typography sx={{ mb: 0.8 }}>
              Address: {props.house.address}.st
            </Typography>
            <Typography sx={{ mb: 0.8 }}>
              Status:
              <span className={props.house.status}> {props.house.status}</span>
            </Typography>
            <Typography sx={{ mb: 0.8 }}>
              Price: <span className="Pending">{props.house.sellingPrice}</span>
            </Typography>
            <Typography sx={{ mb: 0.8 }}>
              Negotiabile:{" "}
              <span
                className={
                  props.house.negotiable == "Yes" ? "Accepted" : "Regected"
                }
              >
                {props.house.negotiable}
              </span>
            </Typography>
          </div>
          <div className="description">
            <Typography variant="body2">
              <span style={{ fontWeight: "bold" }}> Description:</span>{" "}
              <br></br>
              {props.house.description}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            color="success"
            size="small"
            onClick={() => {
              updateStat("Accepted");
            }}
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            color="warning"
            size="small"
            onClick={() => {
              updateStat("Regected");
            }}
          >
            Regect
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => {
              context.deleteHouse(props.house._id, props.house.ownerEmail);
            }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
