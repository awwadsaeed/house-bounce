import { useState, useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { userContext } from "../../context/UserContext";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal(props) {
  const handleOpen = () => props.setOpen(true);
  const handleClose = () => props.setOpen(false);
  const [newPrice, setNewPrice] = useState("0");
  const context = useContext(userContext);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Current Price: {props.price}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
             New Price: {newPrice} JD
            </Typography>
            <br></br>
            <TextField
              type="number"
              required
              id="standard-required"
              label="Street"
              placeholder="Street"
              variant="outlined"
              onChange={(e) => {
                setNewPrice(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                context.updatePrice(props.id, newPrice);
                handleClose();
                setNewPrice("0");
              }}
            >
              update price
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
