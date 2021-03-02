import React , {useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import {Modal} from 'react-bootstrap'
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems } from './listItems';
import Deposits from './Deposits';
import Orders from './Orders';
import staff from './staff'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';
import Title from './Title';
import axios from 'axios';
import StaffTable from './StaffTable';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
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
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
 
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
 
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  var packages_data=[];
  const axios = require('axios');
  const [count, setCount] = useState(0);
  const [myalert, setmyalert] = useState("opacityzero");
  const [alertText, setalertText] = useState("Action success");
 

  const [state, setState] = useState({
		r_name : '',
		r_nID: '',
		r_address: '',
    r_contact : '',
    s_name : '',
    s_nID : '',
    s_address : '',
    s_contact : '',
    p_weight : 0,
    s_country : '',
    r_country : '',
		
    });

    const [result, setResult] = useState(null);
    const [Data, setData] = useState([]);
    const [staffdatafortable, setstaffDataforTable] = useState([]);

    const [isStaff, setisStaff] = useState(false);

    const  handleSubmit = async event => {
      event.preventDefault();
     
      const token = localStorage.getItem('auth-token');
      axios
        .post('https://guarded-citadel-19841.herokuapp.com/api/addpackage', { ...state }, {headers :{'x-auth-token': token}})
        .then(response => {
          console.log(response);
          
          setCount(count+1);
          handleClose();
          preventDefault(0, response.data.msg);
          setState('');
        })
        .catch(() => {
        setResult({
          success: false,
          message: 'Something went wrong. Try again later'
        });
        });


      //Ends Here
      };
      

      const onInputChange = event => {
        const { name, value } = event.target;
      
        setState({
          ...state,
          [name]: value
        });
        };



    //Ended Here
      
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [show, setShow] = useState(false);

  const [showPro, setShowPro] = useState(false);

  const [Staffstate, setStaffState] = useState({
    staffName : '',
    staffEmail : '',
    staffPass : '',
    staffContact : ''
  })
  const [isAdmin, setisAdmin] = useState(false);
  const [stats, setStats] = useState({
    tCount : 0,
    pCount : 0,
    dCount : 0
  })

  const [profile, setProfile] = useState({
    profileName : '',
    profileEmail : '',
    profilePass : ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleProClose = () => setShowPro(false);
  const handleProShow = () => setShowPro(true);

  const getprofileData = () =>{
    var authToken = localStorage.getItem('auth-token');
    axios.post('https://guarded-citadel-19841.herokuapp.com/api/getprofile', {usman : "usman"}, {
      headers : {
        'x-auth-token' : authToken
      }
    }).then((response)=>{

      console.log(response);
      setProfile({
        profileName : response.data.name,
        profileEmail : response.data.email,
        profilePass : response.data.pass
      });
      handleProShow();



    }).catch((error)=>{
      console.log(error);

    })
  }

  const [showStaff, setShowStaff] = useState(false);

  const handleStaffClose = () => setShowStaff(false);
  const handleStaffShow = () => setShowStaff(true);
  
  const updateCount =()=>{
    setCount(count+1);
  }

  useEffect(()=>{
    const token = localStorage.getItem('auth-token');
    
    axios
      .post('https://guarded-citadel-19841.herokuapp.com/dashboarddata',{"name" : "usman"},   {headers :{'x-auth-token': token}})
      .then(response => {
       // console.log(response);
        console.log(response.data.packages);
        setStats({
          tCount : response.data.tCount,
          pCount : response.data.pCount,
          dCount : response.data.dCount
        })
        if(response.data.isAdmin)
        {
          setisAdmin(true);
        }

        
          packages_data = response.data.packages;
          // staffdatatable = response.data.StaffData;
          localStorage.setItem("packages",packages_data);
          setData(response.data.packages);
          setstaffDataforTable(response.data.StaffData);
          //const rows = [createData(packages_data)];

          console.log(packages_data);
          // console.log(staffdatatable);
        
        
        
      })
      .catch((error) => {
        console.log(error);
      setResult({
        success: false,
        message: 'Something went wrong 1. Try again later'
      });
      });    
  }, [count])
  // handleStaffSubmit onStaffInputChange
  const handleStaffSubmit = event =>{
    event.preventDefault();

    var authToken = localStorage.getItem('auth-token');
    axios.post('https://guarded-citadel-19841.herokuapp.com/api/addstaff', {...Staffstate}, {headers : {
      'x-auth-token' : authToken
    }}).then((response)=>{

      console.log(response);
      preventDefault(0, response.data.msg);
      updateCount();

    })
    .catch((error)=>{
      console.log(error)

    })

  }


  const toggleStaff = () => {
    setisStaff(!isStaff)
  }

  const onStaffInputChange = event =>{
    const { name, value } = event.target;
      
        setStaffState({
          ...Staffstate,
          [name]: value
        });
  }

  const onProfileInputChange = event =>{
    const { name, value } = event.target;
      
        setProfile({
          ...profile,
          [name]: value
        });
  }

  function preventDefault(event, msg) {
    //event.preventDefault();
    setalertText(msg);
    setmyalert("opacityone")
    setTimeout(() => {  setmyalert("opacityzero"); }, 3000);
   // myalert === "opacityzero" ? setmyalert("opacityone") : setmyalert("opacityzero")
  }

 
  const [anchorEl, setAnchorEl] = useState(null);


  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const openMenu = Boolean(anchorEl);
  const logmeOut = () =>{
    localStorage.setItem('auth-token', 123);
    window.location.href = '/login';
  }
  const handleProfileEditSubmit = event =>{
    event.preventDefault();
    var authToken = localStorage.getItem('auth-token');
    axios.post('https://guarded-citadel-19841.herokuapp.com/api/editprofile', {...profile}, {
      headers : {
        'x-auth-token' : authToken
      }
    }).then((response)=>{
      console.log(response);
      if(response.msg){
      
      preventDefault(0, response.data.msg);
      handleProClose();

      }
      else
      {
        preventDefault(0, response.data[0].msg);
      }


    }).catch((error)=>{
      console.log(error);

    })
  }

  return (
    <div className={classes.root}>
      <Alert severity="success" className={myalert} style={{position: 'absolute' , top: 30 , zIndex : 2500 , background : 'lightgreen' , left: '37%' , width : '30vw' , transition: 'opacity 1s ease-out'}}>
        <AlertTitle>Success</AlertTitle>
        <strong>{alertText}</strong>
      </Alert>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.title} style={{display : "flex"}}>
            <i class="fa fa-clock-o" aria-hidden="true"></i>
            <Typography component="p" className="emp-tag date" variant="p">
             {Date().toLocaleString().substring(0,24)}
            </Typography>
         
          </div>
         
          <div className="d-flex" >

          <Typography component="p" variant="p" className="emp-tag middle" style={{marginTop : 6}}>
          {isAdmin?   "Hi, Admin": "Hi, Staff"}
            </Typography>
            <div className="emp-box-app" style={{cursor : 'pointer'}}>
                <a onClick={handleMenu} ><h1 className="emp-tag-app">EM</h1></a>
            </div>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={openMenu}
                style={{marginTop : 20}}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={getprofileData}>Edit Profile</MenuItem>
                <MenuItem onClick={logmeOut}>Logout</MenuItem>
              </Menu>
           
            
           </div>
          
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        {open? 
             <React.Fragment>
             <div className="d-flex" >
            <div className="emp-box">
                <h1 className="emp-tag">EM</h1>
            </div>
            <div className="emp-details">   
            <Typography component="p" className="emp-tag" variant="p">
             Employee
            </Typography>
            <Typography component="p" variant="p" className="emp-tag small">
             Welcome Back
            </Typography>
            </div>
        </div>
            </React.Fragment> : null}
        <List>{mainListItems}</List>
       
      {open?  <div class="add-ship">
        {/* <Button variant="contained" style={{background : "#006AEE" , color : "#fff" , width : "82.5%", marginTop : 20}}>
            ADD SHIPMENT
        </Button> */}
        {isAdmin?
        <Button variant="contained"  onClick={handleStaffShow} style={{background : "#006AEE" , color : "#fff" , width : "82.5%", marginTop : 20}}>
            ADD STAFF
        </Button>

        : null}
        <Button variant="contained" onClick={()=>{handleShow();}} style={{background : "#006AEE" , color : "#fff" , width : "82.5%", marginTop : 20}}>
            BOOK COURIER
        </Button>
          {isAdmin?
        <Button variant="contained" onClick={toggleStaff}  style={{background : "#006AEE" , color : "#fff" , width : "82.5%", marginTop : 20}}>
            {isStaff? "VIEW COURIERS" : "VIEW STAFF"}
        </Button>
         : null}
                
            </div> : null} 
        
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Recent Deposits */}
            <Grid item xs={12} md={12} lg={12}>
            
                <Deposits mydata={stats}/>
              
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {isStaff ? <StaffTable staffData = {staffdatafortable} showAlert={preventDefault} increment={updateCount}/>  :  <Orders isAdmin= {isAdmin}  mydata={Data} increment={updateCount} showAlert={preventDefault}/>}
              </Paper>
            </Grid>
            {/* <Grid item xs={12}>
              <Paper className={classes.paper}>
                <staff isAdmin= {isAdmin}  mydata={Data} increment={updateCount} showAlert={preventDefault}/>
              </Paper>
            </Grid> */}
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
      
      <Modal show={show} onHide={handleClose} style={{marginTop: 50}}>
        <Modal.Header closeButton>
         <Typography component="p" className="emp-tag" variant="p">
             BOOK COURIER
         </Typography>
        </Modal.Header>
        <Modal.Body>
            {result && (
            <p className={`${result.success ? 'success' : 'error'}`}>
            {result.message}
            </p>
            )}
            <form onSubmit={handleSubmit}>
              <Title>RECIEVER</Title>    
            
            <div className="text-box">  
            <TextField id="standard-basic" label="Name" name = "r_name" onChange={onInputChange}  value={state.r_name} required />
            <TextField id="standard-basic" label="NID" name = "r_nID" onChange={onInputChange}  value={state.r_nID} required />
            </div>
            <div className="text-box">  
            <TextField id="standard-basic" label="Address" name = "r_address" onChange={onInputChange}  value={state.r_address} required />
            <TextField id="standard-basic" label="Contact No" name = "r_contact" onChange={onInputChange}  value={state.r_contact} required />
            
            </div>
            <div className="text-box">  
            <TextField id="standard-basic" label="Country" name = "r_country" onChange={onInputChange}  value={state.r_country} required />

            </div>
            

            <Title>SENDER</Title>    
            
            <div className="text-box">  
            <TextField id="standard-basic" label="Name" name = "s_name" onChange={onInputChange}  value={state.s_name} required/>
            <TextField id="standard-basic" label="CNIC" name = "s_nID" onChange={onInputChange}  value={state.s_nID} required/>
            </div>
            <div className="text-box">  
            <TextField id="standard-basic" label="Address" name = "s_address" onChange={onInputChange}  value={state.s_address} required />
            <TextField id="standard-basic" label="Contact No" name = "s_contact" onChange={onInputChange}  value={state.s_contact} required/>
           
            </div>
            <div className="text-box">  
            <TextField id="standard-basic" label="Country" name = "s_country" onChange={onInputChange}  value={state.s_country} required/>

            </div>

            <Title>Package</Title> 
            <div className="text-box">  
            <TextField id="standard-basic" label="Weight" name = "p_weight" onChange={onInputChange}  value={state.p_weight} required />
            
            </div>


            <div className="center-eve">
            <Button type="submit" variant="contained" style={{background : "#006AEE" , color : "#fff" , width : "82.5%", marginTop : 20}}>
              Submit
            </Button>  
            </div>
            </form>
        </Modal.Body>
        
      </Modal>


      <Modal show={showStaff} onHide={handleStaffClose} style={{marginTop: 50}}>
        <Modal.Header closeButton>
         <Typography component="p" className="emp-tag" variant="p">
             ADD STAFF
         </Typography>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handleStaffSubmit}>
            <div className="text-box">  
            <TextField id="standard-basic" label="Name" name = "staffName" onChange={onStaffInputChange}  value={Staffstate.staffName} required/>
            <TextField id="standard-basic" label="email" name = "staffEmail" onChange={onStaffInputChange}  value={Staffstate.staffEmail} required />
            </div>
            <div className="text-box">  
            <TextField id="standard-basic" label="Password" name = "staffPass" onChange={onStaffInputChange}  value={Staffstate.staffPass} required  />
            <TextField id="standard-basic" label="Contact No" name = "staffContact" onChange={onStaffInputChange}  value={Staffstate.staffContact} required />
            </div>
            <div className="center-eve">
            <Button variant="contained" type="submit" style={{background : "#006AEE" , color : "#fff" , width : "82.5%", marginTop : 20}}>
              Submit
            </Button>  
            </div>
            </form>
        </Modal.Body>
        
      </Modal>



      <Modal show={showPro} onHide={handleProClose} style={{marginTop: 50}}>
        <Modal.Header closeButton>
         <Typography component="p" className="emp-tag" variant="p">
              EDIT PROFILE
         </Typography>
        </Modal.Header>
        <Modal.Body>
           
            <form onSubmit={handleProfileEditSubmit} > 
            
            <div className="text-box">  
            <TextField id="standard-basic" label="Name" name = "profileName" onChange={onProfileInputChange}  value={profile.profileName} required/>
            <TextField id="standard-basic" label="Email" name = "profileEmail" onChange={onProfileInputChange}  value={profile.profileEmail} required/>
            </div>
            <div className="text-box">  
            <TextField id="standard-basic" label="Password" name = "profilePass" onChange={onProfileInputChange}  value={profile.profilePass} required/>
            {/* <TextField id="standard-basic" label="Email" name = "profileEmail" onChange={onProfileInputChange}  value={profile.email} required/> */}
            </div>

            <div className="center-eve">
            <Button type="submit" variant="contained" style={{background : "#006AEE" , color : "#fff" , width : "82.5%", marginTop : 20}}>
              Submit
            </Button>  
            </div>
            

            </form>
        </Modal.Body>
        
      </Modal>

      
    </div>
  );
}