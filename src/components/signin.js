import React, {useState} from 'react'
import axios from 'axios';

export default function Signin() {

  const [state, setState] = useState({
		
		email: '',
		pass: ''
		
    });

    const [result, setResult] = useState(null);

    const handleSubmit = event =>{
      event.preventDefault();
      axios.post('https://guarded-citadel-19841.herokuapp.com/api/login', {...state}).then((response)=>{
       // console.log(response);
        if(response.data.proceed == 0){
      localStorage.setItem('auth-token', response.data.token);
      window.location.href = '/';
        }
        else
        {
          setResult({
            success: false,
            message: response.data.msg
            });
          console.log(response);
        }
      }).catch((error)=>{
        console.log(error);
        setResult({
          success: false,
          message: error
          });
      })

    }


  const onInputChange = event => {
    const { name, value } = event.target;
  
    setState({
      ...state,
      [name]: value
    });
    };
    return (
        <div class="d-lg-flex half p-3">
    
        <div class="bg order-1 order-md-1" ></div>
        <div class="contents order-2 order-md-2">
    
          <div class="container">
            <div class="row align-items-center justify-content-center">
              <div class="col-md-7">
                <div class="mb-4">
                  <h3>Sign In</h3>
                  <p class="mb-4">Login to proceed</p>
                </div>
                {result && (
                <p className={`${result.success ? 'success' : 'error'}`}>
                {result.message}
                </p>
                )}
                <form onSubmit={handleSubmit}>
                  <div class="form-group first">
                  
                    <input type="text" placeholder="Email" class="form-control" name="email" onChange={onInputChange}  value={state.email} required/>
    
                  </div>
                  <div class="form-group last mb-3">
                    
                    <input type="password" placeholder="Password" class="form-control" id="password" name="pass" onChange={onInputChange}  value={state.pass} required/>
                    
                  </div>
                  
                  {/* <div class="d-flex mb-5 align-items-center">
                    <label class="control control--checkbox mb-0"><span class="caption">Remember me</span>
                      <input type="checkbox" />
                      <div class="control__indicator"></div>
                    </label>
                    <span class="ml-auto"><a href="#" class="forgot-pass">Forgot Password</a></span> 
                  </div> */}
    
                  <input type="submit" value="Log In" class="btn btn-block btn-primary"/>
    
                  
                  
                
                </form>
              </div>
            </div>
          </div>
        </div>
    
        
      </div>
    )
}
