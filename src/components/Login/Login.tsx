import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom'

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

class Login extends React.Component<{},{username:string,password:string}>{

  constructor(prop:any){
    super(prop);

    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Service Operations
  
  postValidateLogin(username:string,password:string){
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Accept': 'application/json','Cache-Control':'no-cache','Connection':'keep-alive'},
      body: JSON.stringify({ username:{username},password:{password} })
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
  
    alert(res.result);
    
    ReactDOM.render(
      <div id="root">
        {res.result}
      </div>
      ,document.getElementById('root'));
  }

  render(){
    return(
    <div id="root" data-testid="Login" className="container-center-screen">
      <form onSubmit={this.handleSubmit}>
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
        <button type="submit" className="login-button">ลงชื่อเข้าใช้งาน</button>
      </form>
    </div>
    );
  }
}

export default Login;
