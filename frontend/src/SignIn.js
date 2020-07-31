
import React from 'react';
import axios from 'axios';

import App from './App';
import './signin.css';


export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      emailInput: '', passInput: '', displayLoading: false,
    }
    if(process.env.REACT_APP_ENV === 'production'){
      this.baseUrl = process.env.REACT_APP_PROD_URL;
    }
    if(process.env.REACT_APP_ENV === 'development'){
      this.baseUrl = process.env.REACT_APP_DEV_URL;
    }
  }

  componentDidMount() {
    if (sessionStorage.getItem('authToken') != null) {
      this.setState({signedIn: true});
    }
  }

  login = async () => {
    const {emailInput, passInput } = this.state;
    if(emailInput.length === 0 || passInput.length === 0){
      const msg = 'Please fill in all fields'
      alert(msg)   
      return;        
    }
    try {
      this.setState({ displayLoading: true});
      const data = { email: emailInput, password: passInput };
      const response = await axios.post(`${this.baseUrl}/auth/login/`, data);
      sessionStorage.setItem('authToken', response.data.access);
      sessionStorage.setItem('refreshToken', response.data.refresh);
      this.setState({ signedIn: true });
    } catch (error) {
      if(error.response){
        if(error.response.status === 401){
          const msg = 'Invalid Credentials\nUse email: test@mail.com and password: test123';
          alert(msg);     
        }else{
          alert('Server Error');     
        }
      }else{
        alert('Server Error');         
      }
    }
    this.setState({ displayLoading: false});
  }

  sessionExpired = () => {
    this.setState({signedIn: false})
  }

  renderLogin = () => {
    const { displayLoading } = this.state;
    return(
      <div className="signin-body">
        <p className="c ">Login to access</p>

        <div className="signin-form">
          <form style={{ border: "1px solid #ccc"}}>
            <div className="container" style={{paddingBottom: '5%'}}>

              <label htmlFor="email"><b>Email</b></label>
              <input type="text" placeholder="Use test@mail.com" name="email" required 
                onChange={(e) => {this.setState({emailInput: e.target.value})}} value={this.state.emailInput}/>

              <label htmlFor="psw"><b>Password</b></label>
              <input type="password" placeholder="Use test123" name="psw" required 
                onChange={(e) => {this.setState({passInput: e.target.value})}} value={this.state.passInput}/>

              {!displayLoading && <div className="clearfix">
                  {/* <button type="button" className="cancelbtn" onClick={this.cancel}>Cancel</button> */}
                  <button type="button" className="signupbtn" onClick={this.login}>Login</button>
              </div>}

              { displayLoading && <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div> }
            </div>
          </form>
        </div>

      </div>
    )
  }

  render() {
    const { signedIn } = this.state;
    return(
      <>
      { !signedIn && this.renderLogin() }
      { signedIn  && <App sessionExpired={this.sessionExpired}/> }
      </>
    );
  }

}

