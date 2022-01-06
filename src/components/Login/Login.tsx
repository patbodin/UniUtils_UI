import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom'
import Dashboard from '../Dashboard/Dashboard';
import Logo from '../../images/logo.png';

interface ILogin{
  result:string;
  resultCode: string;
  resultMessage:string;
  id:string;
  username:string;
  password:string;
  isAdmin: boolean;
  datetime:string,
  timestamp:string
}

class Login extends React.Component<{},{username:string,password:string,isLogin:boolean}>{

  constructor(prop:any){
    super(prop);

    this.state = {
      username: '',
      password: '',
      isLogin: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Service Operations
  
  postValidateLogin(username:string,password:string){
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Accept': 'application/json','Cache-Control':'no-cache','Connection':'keep-alive'},
      body: '{ "username":"'+username+'","password":"'+password+'"}'
    };
    let url = 'http://10.138.46.91:5099/api/logins/v1/validatelogin/';
    fetch(url, requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            this.renderResult(data as ILogin)

        })
        .catch(error => {
            alert(error.message);
        });
  }

  handleChange(event:any){
    switch(event.target.id){
      case 'input-username':
        this.setState({username:event.target.value});
        break;
      case 'input-password':
        this.setState({password:event.target.value});
        break;
      default:break;
    }
  }

  handleSubmit(event:any){
    this.postValidateLogin(this.state.username,this.state.password);
  }

  renderResult(res:ILogin){
  
    if(res.result == 'Success'){
    this.setState({isLogin:true});
    }else{
      alert(res.resultMessage);
    }
  }

  render(){
    if(this.state.isLogin){
      return(<Dashboard username={this.state.username}/>);
    }
    return(
    <div id="root" data-testid="Login">
      <img src={Logo} className='App-logo App-Logo-Center'/> <br/>
    <div className='centered padding-content background-light round-border drop-shadow'>
        <div className="inline-label-input">
        <label>
          ชื่อผู้ใช้งาน : <input type="text" id="input-username" className="long-input-text" value={this.state.username} onChange={this.handleChange}/>
        </label><br/>
        </div>
        <div className="inline-label-input">
        <label>
          รหัสผ่าน : <input type="password" id="input-password" className="long-input-text" value={this.state.password} onChange={this.handleChange}/>
        </label><br/>
        </div>
        <button type="button" className="login-button" onClick={this.handleSubmit}>ลงชื่อเข้าใช้งาน</button>
    </div>
    </div>
    );
  }
}

export default Login;
