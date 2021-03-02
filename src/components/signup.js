import React , {useRef, useState} from 'react'
import axios from 'axios';
export default function Signup() {
  const axios = require('axios');

  const [state, setState] = useState({
		name : '',
		email: '',
		pass: ''
		
    });

    const [result, setResult] = useState(null);
    

    const  handleSubmit = async event => {
      event.preventDefault();
      
      axios
        .post('http://localhost:9000/register', { ...state })
        .then(response => {
          console.log(response);
          if(response.data.proceed==0)
          {
          //reRef.current.reset();
           // alert("redirection successfull");
           localStorage.setItem('auth-token', response.data.token);
           window.location.href = "/";	
          }
          else
          {
          
          setResult({
          success: true,
          message: response.data[0].msg
          });
        //setResult(response.data[0].msg);
        setState({
          name : '',
          email: '',
          
          pass: ''
        });
      }
        })
        .catch((error) => {
          console.log(error);
        // setResult({
        //   success: false,
        //   message: error
        // });
        });
      };

      const onInputChange = event => {
        const { name, value } = event.target;
      
        setState({
          ...state,
          [name]: value
        });
        };





    return (
        <div class="d-lg-flex half p-3">
    
        <div class="bg order-1 order-md-2" ></div>
        <div class="contents order-2 order-md-1">
    
          <div class="container">
            <div class="row align-items-center justify-content-center">
              <div class="col-md-7">
                <div class="mb-4">
                  <h3>Sign Up</h3>
                  <p class="mb-4">Kindly fill this form to proceed</p>
                </div>
                {result && (
                <p className={`${result.success ? 'success' : 'error'}`}>
                {result.message}
                </p>
                )}
                <form onSubmit={handleSubmit} >

                <div class="form-group first">
                   
                    <input type="email" placeholder="Email" class="form-control" name="email" onChange={onInputChange}  value={state.email} required/>
    
                </div>

                  <div class="form-group middle">
                    <input type="text" placeholder="Name" class="form-control" name="name" onChange={onInputChange}  value={state.name} required/>
    
                  </div>

                  <div class="form-group last mb-3">
                    <input type="password" placeholder="Password" class="form-control" name="pass" onChange={onInputChange}  value={state.pass} required/>
                    
                  </div>
                  
                  <div class="d-flex mb-5 align-items-center">
                    <label class="control control--checkbox mb-0"><span class="caption">Remember me</span>
                      <input type="checkbox" />
                      <div class="control__indicator"></div>
                    </label>
                    <span class="ml-auto"><a href="#" class="forgot-pass">Already have an account? </a></span> 
                  </div>
    
                  <input type="submit" value="Register" class="btn btn-block btn-primary"/>
    
                  
                  
                
                </form>
              </div>
            </div>
          </div>
        </div>
    
        
      </div>
    )
}
