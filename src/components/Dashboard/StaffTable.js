import React , {useState} from 'react';
import Link from '@material-ui/core/Link';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';

import {Modal} from 'react-bootstrap'

import TextField from '@material-ui/core/TextField';



// Generate Order Data
function createData(name, date , responses) {
  return { name, date , responses };
}

const rows = [
  createData('MCAT', '15-10-19'),
  createData('ECAT', '15-10-19'),
  createData('NTS', '15-10-19'),
  createData('GAT', '15-10-19'),
  createData('ARMY', '15-10-19'),
];


const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  
  },
}));

export default function StaffTable(props) {
  const classes = useStyles();


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [state, setState] = useState({
    staffName : '',
    staffEmail : '',
    id : 0
  })


  const  deleteStaff = (id) =>
  {
    var authToken = localStorage.getItem('auth-token');
    axios.post('http://localhost:9000/api/deletestaff', {id}, {headers : {
      'x-auth-token' : authToken
    }}).then((response)=>{
      console.log(response);
      props.showAlert(0, response.data.msg);
      props.increment();
      

    }).catch((error)=>{
      console.log(error);

    })

  }

  const handleEditStaffSubmit = event =>
  {
    event.preventDefault();
    var authToken = localStorage.getItem('auth-token');
    axios.post('http://localhost:9000/api/editstaff',{...state},
    {
      headers : {
        'x-auth-token' : authToken
      }
    }).then((response)=>{
      console.log(response);
      props.showAlert(0, response.data.msg);
      props.increment();
      handleClose();

    }).catch((error)=>{
      console.log(error);

    })
  }

  const onInputChange = event =>{
    const { name, value } = event.target;
      
        setState({
          ...state,
          [name]: value
        });
  }


  const getEditData = id =>
  {
    var authToken = localStorage.getItem('auth-token');
    axios.post('http://localhost:9000/api/getstaffdata', {id}, {headers : {
      'x-auth-token' : authToken
    }}).then((response)=>{
      console.log(response);

      setState({
        staffEmail : response.data.email,
        staffName : response.data.name,
        id : id
      });
      handleShow();

    }).catch((error)=>{

    })
    
  }
  return (
    <React.Fragment>
     
       <Typography component="p" className="emp-tag" variant="p">
            STAFF DETAILS
       </Typography>
       <br/>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell >Staff Name</TableCell>
            {/* <TableCell >staff name</TableCell> */}
            <TableCell >Staff Email</TableCell>
            


            <TableCell >Edit</TableCell>
            <TableCell >Remove staff</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {props.staffData.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              {/* <TableCell >{row.date}</TableCell> */}
              
              <TableCell >{row.email}</TableCell>
             
              <TableCell >   <Button
         variant="contained" size="small"
         className="ml-5"
        style={{background: "#7167f4 ", color: "#fff" , }}
        className={classes.button}
        startIcon={<EditIcon />}
        onClick={()=>{getEditData(row._id);}}
        
      >
        EDIT
      </Button>
      
      </TableCell>
      <TableCell >  <Button
         variant="contained" size="small"
         className="ml-5"
         color="secondary"
        
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={()=>{deleteStaff(row._id)}}
      >
        Delete
      </Button>
      
      </TableCell>
              
              </TableRow>
          ))}
        </TableBody>
      </Table>
      
      

      <Modal show={show} onHide={handleClose} style={{marginTop: 50}}>
        <Modal.Header closeButton>
         <Typography component="p" className="emp-tag" variant="p">
              EDIT STAFF
         </Typography>
        </Modal.Header>
        <Modal.Body>
           
            <form onSubmit={handleEditStaffSubmit}> 
            
            <div className="text-box">  
            <TextField id="standard-basic" label="Name" name = "staffName" onChange={onInputChange}  value={state.staffName} required/>
            <TextField id="standard-basic" label="Email" name = "staffEmail" onChange={onInputChange}  value={state.staffEmail} required/>
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