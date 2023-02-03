import React,{ useEffect, useState }from 'react';
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import FileUploadSingle from "../../components/FileUpload/FileUploadSingle";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent, MenuItem, Typography } from "@mui/material";
import { axiosClient, downnLoadExcel,getSuBjectwiseQuiz } from "../../api/apiAgent";
import SubjectwiseDetails from '../../Interface/SubjectwiseDetails';
import {
    Grid,
    Card,
    CardContent,
    CardHeader
} from '@material-ui/core/';

const SubjectExpert = (props: any) => {
  const navigate = useNavigate();
  const [subjectwiseQuizs, setSubjectList] = useState<SubjectwiseDetails[]>([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  const downloadFile = () => {
    downnLoadExcel()
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "excel-file.xlsx"); // set the downloaded file name
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error(error);
      });
    // axiosClient
    //   .get("/quiz/exportTemplate", { responseType: "blob" })
    //   .then((response) => {
    //     const url = window.URL.createObjectURL(new Blob([response.data]));
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.setAttribute("download", "excel-file.xlsx"); // set the downloaded file name
    //     document.body.appendChild(link);
    //     link.click();
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };
  const subjectwiseQuizDetails=async ()=>{
      const subjectdetails=getSuBjectwiseQuiz("")
      .then((response) => {
        setSubjectList(response.data);
      })
    }
    useEffect(() => {
      subjectwiseQuizDetails();
     }, []);
  return (
    <div>
    <Box className="main-layout-wrap" sx={{ height: 250}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
          </IconButton>
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
      <Box sx={{ "& button": { m: 2 } }}>
        <div>
          <Button
            variant="contained"
            onClick={handleOpen}
            className={"manage-buttons"}
          >
            File Upload
          </Button>
        </div>
        <Dialog maxWidth="sm" open={open}>
          <DialogContent>
            <AppBar className="add-appbar">
              <Toolbar>
                <IconButton
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                  className="add-close-dialog"
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <FileUploadSingle />
          </DialogContent>
        </Dialog>
      </Box>
      <Button variant="contained" onClick={downloadFile}>
        Download
      </Button>
    </Box>
    <div>
    <Grid container  spacing={1} alignItems="flex-start">
       {subjectwiseQuizs.map(elem => (
            <Grid item xs={12} sm={6} md={4}  key={subjectwiseQuizs.indexOf(elem)}>
                <Card>
                <Typography  variant="h6"  display="flex"
                  justifyContent="space-between" alignItems="center" style={{ padding:20 }}>
                  {elem.subjectName}
                  <Button variant="contained">View</Button>
                </Typography>
                 <CardContent>
                 <Typography>
                    <strong>{`Set : ${elem.setNumber}`}  &nbsp; &nbsp;
                    {`Total Questions : ${elem.totalQuestionsCount}`}
                    </strong> 
                 </Typography> 
                    <Typography >
                    {`Created By : ${elem.createdBy==null?'Test User':elem.createdBy}`}<br/>
                    {`Updated By : ${elem.updatedBy==null?'Test User':elem.updatedBy}`}<br/>
                    {`Created Date : ${elem.createdDate}`}<br/>
                    {`Updated Date : ${elem.updatedDate}`}
                    </Typography>
                 </CardContent>
                </Card>
            </Grid>
        ))}
    </Grid>
   </div>
   </div>
    );
};

export default SubjectExpert;
