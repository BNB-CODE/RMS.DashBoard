import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
//import { AuthContext } from "../../context/AuthContectProvider";
import { Typography } from "@mui/material";

const Interviewer = (props: any) => {
  const navigate = useNavigate();
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  return (
    <Box className="main-layout-wrap">
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => navigate(-1)}
          >
            Augmento labs RMS
          </Typography>
          <Button color="inherit">Log out</Button>
        </Toolbar>
      </AppBar>
      <hr />
      <p>
        <h1>Interviewer Page Development in progrss</h1>
        <br />
        <button onClick={() => navigate(-1)}>Home</button>
      </p>
    </Box>
  );
};

export default Interviewer;
