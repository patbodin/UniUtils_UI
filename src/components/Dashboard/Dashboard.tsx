import React from 'react';

class Dashboard extends React.Component{
  constructor(props:any){
    super(props);
  }

  render(){
    return(
      <div id="root" className="main-item">
        <h1>Hello, Admin</h1><br/>
        <div>
          <div className="app-icon animated-background"/><br/>
          <div className="app-name animated-background"/>
        </div>
        
      </div>
    );
  }
}

export default Dashboard;
