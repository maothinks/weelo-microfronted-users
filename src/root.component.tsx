import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import UserService from "./Services/UserService";

export default function Root(props) {

  // USE STATES
  const [snakMessage, setSnakMessage] = useState({ open: false, message: "" });
  const [user, setUser] = useState({
    FirstName: "",
    Username: "",
    BirthDate: "",
    PhotoPath: "",
    Views: "",
    Address: ""
  });

  // USE EFFECTS
  useEffect(() => {
    var localUser = JSON.parse(sessionStorage.getItem('user'));
    new UserService().getById(localUser.id, sessionStorage.getItem('token')).then((result: any) => {
      setUser({ ...user, FirstName: result.firstName, Address: result.address, Username: result.username });
    }).catch(err => {
      setSnakMessage({ ...snakMessage, open: true, message: "AUTH/USERS MICROSERVICE: " + err.toString() });
    });

  }, [])

  // HANDLE CLOSE SNACK BAR MESSAGE
  const handleClose = () => {
    setSnakMessage({ ...snakMessage, open: false });
  };

  return <>
    <div className="flex">
      <br></br>
      <div style={{ fontWeight: 'bolder' }}>UserName:</div>{user.Username ? <div>{user.Username}</div> : <div></div>}
      <br></br>
      <div style={{ fontWeight: 'bolder' }}>FirstName:</div>{user.FirstName ? <div>{user.FirstName}</div> : <div></div>}
      <br></br>
      <div style={{ fontWeight: 'bolder' }}>Address:</div>{user.Address ? <div>{user.Address}</div> : <div></div>}
    </div>
    <Snackbar
      anchorOrigin={{ "vertical": "top", "horizontal": "right" }}
      open={snakMessage.open}
      onClose={handleClose}>
      <Alert variant="filled" severity="error">{snakMessage.message}</Alert>
    </Snackbar>
  </>
  // <section>{props.name} is mounted!</section>;
}
