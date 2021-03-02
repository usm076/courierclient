import React , {useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import {Modal} from 'react-bootstrap'
import { Alert, AlertTitle } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import withAuth from '../../LoggedIn';


// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  // for(let i=0;i<packages_data.length, i++){
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
 // }
];


const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '23ch',
  
  },
}));

export default function Orders(props) {
  const [edit, setEdit] = useState({
    r_n : '',
    r_addr : '',
    r_c : '',
    r_nic  :'',
    s_n : '',
    s_addr : '',
    s_c : '',
    s_nic  :'',
    status : '',
    packagetoedit_id : 0

  })
  var [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [packageState, setPackageVariables] = useState({
    height : 0,
    length : 0,
    width : 0 ,
    package_id : 0
  });

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  var pack_edit_id=0;

  const [showPackage, setShowPackage] = useState(false);

  const handlePackageClose = () => setShowPackage(false);
  const handlePackageShow = () => setShowPackage(true);

  const [showEdit, setShowEdit] = useState(false);

  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = () => {
   // alert(id);
    setShowEdit(true);
    
  }

  const callme = packID => {
    setPackageVariables({
      ...packageState,
      package_id : packID
    });
    handlePackageShow();
  }


  const editData = id => {
    
    
    var authToken = localStorage.getItem('auth-token');
    axios.post('https://guarded-citadel-19841.herokuapp.com/api/getpackagedata', {package_id: id }, {headers : {
      'x-auth-token' : authToken
    }}).then((response)=>{
      console.log(response);
      setEdit({
            r_n : response.data.package.r_name,
            r_addr : response.data.package.r_address,
            r_c : response.data.package.r_contact,
            r_nic  :response.data.package.r_nationalId,
            s_n : response.data.package.s_name,
            s_addr : response.data.package.s_address,
            s_c : response.data.package.s_contact,
            s_nic  :response.data.package.s_nationalId,
            status  : response.data.package.status,
            p_weight : response.data.package.p_actualWeight,
            packagetoedit_id : id
        
      })
      handleEditShow();


    }).catch((error)=>{
      console.log(error);
    })
    //console.log(id)
  }
  
  
  const onPackageDetailChange= event =>{
    const { name, value } = event.target;
      
    setPackageVariables({
          ...packageState,
          [name]: value
        });

  }
  const onpEditChange = event =>{
    event.preventDefault();
    //var pack_id= getPackId();
    const authToken = localStorage.getItem('auth-token');
    axios.post('https://guarded-citadel-19841.herokuapp.com/api/editpackagedata', {...edit  }, {headers : {
      'x-auth-token' : authToken
    }}).then((response) =>{
      handleEditClose();
      console.log(0,response.data.msg)
      props.showAlert(0, response.data.msg);
      props.increment();



    }).catch((error)=>{
      console.log(error);

    })
  }
  const oneditFormChange= event =>{
    const { name, value } = event.target;
      
    setEdit({
          ...edit,
          [name]: value
        });

  }

  const handlePackageSubmit = (event, pack_id) => {

    event.preventDefault();
    //alert(currentId);
    var authToken = localStorage.getItem('auth-token');
    axios.post('https://guarded-citadel-19841.herokuapp.com/api/addpackagedimension', {...packageState}, {headers:{
      'x-auth-token' : authToken
    }}).then((response)=>{
      console.log(response.data.msg);
      // preventDefault(0, response.data.msg);
      props.showAlert(0, response.data.msg);
      handlePackageClose();
      props.increment();

    }).catch((error)=>{
      console.log(error);
    })



  }
  const handlePackageDeletion = (pack_id) =>{
    const authToken = localStorage.getItem('auth-token');
    axios.post('https://guarded-citadel-19841.herokuapp.com/api/deletepackage', {id : pack_id}, {headers : {
      'x-auth-token' : authToken
    }}).then((response)=>{

      // preventDefault(0, response.data.msg);
      props.showAlert(0, response.data.msg);
      
      props.increment();


      // Trigger successful flag and reload the table data

    }).catch((error)=>{

    })
    
    
  }
  function generatePdf(pid) {
    //alert(pid);
    const authToken = localStorage.getItem('auth-token');
    axios.post('https://guarded-citadel-19841.herokuapp.com/api/generatepdf', {pid}, {headers : {
      'x-auth-token' : authToken
    }}).then((response)=>{
      console.log(response);
      props.showAlert(0, response.data.msg);

    }).catch((error)=>{
      console.log("This is error : ",error);
    })
  }

  return (
    <React.Fragment>
      {/* <Alert severity="success" className={myalert} style={{position: 'absolute' , top: 30 , zIndex : 2500 , background : 'lightgreen' , left: '37%' , width : '30vw' , transition: 'opacity 1s ease-out'}}>
        <AlertTitle>Success</AlertTitle>
        <strong>{alertText}</strong>
      </Alert> */}

       <Typography component="p" className="emp-tag" variant="p">
             Latest Shipments
       </Typography>
       <br/>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Package ID</TableCell>
            <TableCell>Sender name</TableCell>
            <TableCell>Receiver name</TableCell>
            <TableCell>Receiver address</TableCell>
            <TableCell>Receiver Contact</TableCell>
            <TableCell>Chargeable weight</TableCell>
            <TableCell>Package Dimension</TableCell>
            <TableCell>Status</TableCell>
            
             <TableCell>Add Package</TableCell>

            
            
            <TableCell>Edit</TableCell> 
            {props.isAdmin? <TableCell >Delete</TableCell> : null}
            <TableCell >Print</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.mydata.map((row) => (
            <TableRow key={row._id}>
              <TableCell>786-{row.packID}</TableCell>
              <TableCell>{row.s_name}</TableCell>
              <TableCell>{row.r_name}</TableCell>
              <TableCell>{row.r_address}</TableCell>
              <TableCell>{row.r_contact}</TableCell>
              <TableCell>{row.p_chargeableWeight}</TableCell>
              <TableCell>{parseFloat(row.p_length.$numberDecimal.toString())} X {parseFloat(row.p_height.$numberDecimal.toString())} X {parseFloat(row.p_width.$numberDecimal.toString())}</TableCell>
              {/* <TableCell>{row.s_contact}</TableCell> */}
              {/* <TableCell>{parseInt(row.p_length)}X{parseInt(row.p_height)}X{parseInt(row.p_width)}</TableCell> */}
              
              {/* <TableCell >{row.amount}</TableCell> */}
              <TableCell>    <FormControl className={classes.formControl}>
      
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={row.status}
          onChange={handleChange}
        >
          <MenuItem value={row.status} >{row.status}</MenuItem>
          
        </Select>
      </FormControl>
      </TableCell>
      <TableCell>
              <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        onClick = {()=>{ callme(row._id); }}
        // setCurrentId(row._id);
      >
        Add
      </Button>
              </TableCell>
              <TableCell>
              <Button
        variant="contained"
        color="info"
        size="small"
        onClick = {()=>{
        editData(row._id);
        }}
        className={classes.button}
        startIcon={<EditIcon />}
      >
        Edit
      </Button>
              </TableCell>
              {props.isAdmin? <TableCell >
              <Button
        variant="contained"
        color="secondary"
        size="small"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick = {()=>{setCurrentId(row._id); handlePackageDeletion(row._id); }}
      >
        Delete
      </Button >
              </TableCell>: null }
         
              <TableCell >
              <Button 
              
        variant="contained"
        color="warning"
        size="small"
        className={classes.button}
        onClick={() => {generatePdf(row._id)}}
      >
        Print
      </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      
      <Modal show={showPackage} onHide={handlePackageClose} size="lg" style={{marginTop: 100}}>
        <Modal.Header closeButton>
         <Typography component="p" className="emp-tag" variant="p">
             Shipment Details
         </Typography>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handlePackageSubmit}>
            <div className="text-box-2">  
            <TextField id="standard-basic" name="length" label="Length" onChange={onPackageDetailChange}  value={packageState.length} required />
            <Typography component="p" className="emp-tag mt-3" variant="p">
             X
           </Typography>
            <TextField id="standard-basic" name="width" label="Width" onChange={onPackageDetailChange}  value={packageState.width} required />
            <Typography component="p" className="emp-tag mt-3" variant="p ">
             X
            </Typography>
            <TextField id="standard-basic" name="height" label="Height"  onChange={onPackageDetailChange}  value={packageState.height} required/>
            </div>
            <div className="text-box">  
            
            </div>
            <div className="center-eve">
            <Button variant="contained" type="submit" style={{background : "#006AEE" , color : "#fff" , width : "82.5%", marginTop : 20}}>
              Submit
            </Button>  
            </div>
            </form>
        </Modal.Body>
      </Modal>



      <Modal show={showEdit} onHide={handleEditClose} style={{marginTop: 50}}>
        <Modal.Header closeButton>
         <Typography component="p" className="emp-tag" variant="p">
             EDIT COURIER
         </Typography>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={onpEditChange} >
              <Title>RECIEVER</Title>    
            
            <div className="text-box">  
            <TextField id="standard-basic" label="Name" name = "r_n" onChange={oneditFormChange}  value={edit.r_n}  required />
            <TextField id="standard-basic" label="NID" name = "r_nic" onChange={oneditFormChange}  value={edit.r_nic}  required />
            </div>
            <div className="text-box">  
            <TextField id="standard-basic" label="Address" name = "r_addr" onChange={oneditFormChange}  value={edit.r_addr}  required />
            <TextField id="standard-basic" label="Contact No" name = "r_c" onChange={oneditFormChange}  value={edit.r_c}  required />
            </div>

            <Title>SENDER</Title>    
            
            <div className="text-box">  
            <TextField id="standard-basic" label="Name" name = "s_n" onChange={oneditFormChange}  value={edit.s_n}  required/>
            <TextField id="standard-basic" label="CNIC" name = "s_nic" onChange={oneditFormChange}  value={edit.s_nic}  required/>
            </div>
            <div className="text-box">  
            <TextField id="standard-basic" label="Address" name = "s_addr" onChange={oneditFormChange}  value={edit.s_addr}  required />
            <TextField id="standard-basic" label="Contact No" name = "s_c" onChange={oneditFormChange}  value={edit.s_c}  required/>
            </div>
            <Title>Package Status</Title>
            <div className="text-box">  
            <TextField id="standard-basic" label="Weight" name = "p_weight" onChange={oneditFormChange}  value={edit.p_weight}  required />
            {/* <TextField id="standard-basic" label="Contact No" name = "s_c" onChange={oneditFormChange}  value={edit.s_c}  required/> */}
          
                
     <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label-dimension">Delivery Status</InputLabel>
            <Select labelId="demo-simple-select-label-dimension"  id="demo-simple-select" name="status" value={edit.status} onChange={oneditFormChange}>
            <MenuItem value="Pending" >Pending</MenuItem>
            <MenuItem value="Delivered" >Delivered</MenuItem>
            </Select>
        
      </FormControl>
          
            </div>
      

            <div className="center-eve">
            <Button type="submit" variant="contained" style={{background : "#006AEE" , color : "#fff" , width : "82.5%", marginTop : 20}}>
              Submit
            </Button>  
            </div>
            </form>
        </Modal.Body>
        
      </Modal>

    </React.Fragment>
  );
}