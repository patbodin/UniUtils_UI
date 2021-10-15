import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom'

class Login extends React.Component{

  //Service Operations
  getRandomIDNumber(count:number,except:string): Promise<JSON>{
    let url = 'http://10.138.46.91:5099/api/idnumbers/v1/randomidnumber?count='+count;
    if(except.length > 0){
      url += '&exclude='+except;
    }
    return fetch(url)
      .then(res => res.json())
      .then(res => {
        this.renderResult()
        return res as JSON
      })
  }

  renderResult(){
  
    
    ReactDOM.render(
      <div id="root">
        
      </div>
      ,document.getElementById('root'));
  }

  render(){
    return(
    <div id="root" data-testid="Login">
      <form>
        <label>
          Username : <input type="text"/>
        </label><br/>
        <label>
          Password : <input type="password"/>
        </label><br/>
        <button type="submit">Login</button>
      </form>
    </div>
    );
  }
}

export default Login;
