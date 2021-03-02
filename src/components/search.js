import React ,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import {Modal} from 'react-bootstrap'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10px 12px',
    display: 'flex',
    alignItems: 'center',
    width: 500,
    
    boxShadow: "0 0 20px 0 rgb(0 0 0 / 30%)"
  },
  
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#fff",
    color: "#000", 
    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2)"
    
    
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function Search() {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [track, setTrack] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => {  setShow(true) };

  const [trackText, setTrackText] = useState("");


  const onInputChange = event =>{
    const { name, value } = event.target;
      
        setTrack(value);
  }

  const handleTrackingSubmit = event =>{
    event.preventDefault();

   // var authToken = localStorage.getItem('auth-token');
    axios.post('https://guarded-citadel-19841.herokuapp.com/api/track', {track} ).then((response)=>{

      console.log(response);
      setTrackText(response.data.packStatus);
      handleShow();
      //preventDefault(0, response.data.msg);

    })
    .catch((error)=>{
      console.log("This is error : ",error)

    })

  }


  return (
      <div className="center-eve bg" style={{height : '100vh'}}>
           <AppBar position="absolute" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
              <div className={classes.title} style={{display : "flex", flexGrow: 1}}>
            <i class="fa fa-clock-o" aria-hidden="true"></i>
            <Typography component="p" className="emp-tag date" variant="p">
             {Date().toLocaleString().substring(0,24)}
            </Typography>
         
          </div>
         
          <div className="d-flex" >

          <Typography component="p" variant="p" className="emp-tag middle" style={{marginTop : 6}}>
             Hi , Employee
            </Typography>
            <div className="emp-box-app">
                <h1 className="emp-tag-app">EM</h1>
            </div>
             
           
            
           </div>
           {/* component="form" */}
        </Toolbar>
      </AppBar>
      <form onSubmit={handleTrackingSubmit}>
    <Paper   className={classes.root}>
   
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
     
      <InputBase
        className={classes.input}
        placeholder="consignment no.."
        inputProps={{ 'aria-label': 'search consignment no..' }}
        name = "track" onChange={onInputChange}  value={track} required
      />
 
      <Divider className={classes.divider} orientation="vertical" />
      <Button type="submit" className={classes.iconButton} aria-label="search" >
        <SearchIcon />
      </Button>
      
    </Paper>
    </form>
    <Modal show={show} onHide={handleClose} style={{marginTop: 100}}>
        <Modal.Header closeButton>
         <Typography component="p" className="emp-tag" variant="p">
             Courier Track
         </Typography>
        </Modal.Header>
        <Modal.Body>
            <div className="center-eve">

            <Typography component="p" className="emp-tag text-dark p-5 mb-5" variant="p">
            Package Status : {trackText}
         </Typography>
            </div>
        </Modal.Body>
        
      </Modal>

    </div>
  );
}
