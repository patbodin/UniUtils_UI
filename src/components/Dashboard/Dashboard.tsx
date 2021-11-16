import React from 'react';
import dashboard from '../../local-json/dashboard.json';
import RandomIDNumber from '../RandomIDNumber/RandomIDNumber';
import ReactDOM from 'react-dom'

class Dashboard extends React.Component<{},{loading:boolean}>{
  constructor(props:any){
    super(props);
    this.state={
      loading:true
    };

    this.handleClick = this.handleClick.bind(this);
  }

  async getDashboardData(){
    /* With Timeout */
    return await setTimeout(async () => {
    this.setState({loading:false})
    }, 3000) 
  }
  componentDidMount(){
    this.getDashboardData();
  }

  handleClick(appId:string){
   this.renderApp(appId);
  }
  
  renderApp(appid:string){
    switch(appid){
      case 'RandomIDNumber':
        ReactDOM.render(
          <RandomIDNumber/>
          ,document.getElementById('root'));
        break;
      default:break;
    }
  }

  render(){
    if(this.state.loading){
      return(
        <div id="root" className="main-item">
          <h1>Hello, Admin</h1><br/>
          {dashboard.apps && dashboard.apps.map(({name,appid,icon})=>(
            <div id={dashboard.id} className="app-icon-container">
              <div className="app-icon animated-background"/><br/>
              <div className="app-name animated-background"/>
            </div>
          ))}
        </div>
      );
   }
   return(
    <div id="root">
    <h1>Hi, Nathasha</h1><br/>
    {dashboard.apps && dashboard.apps.map(({name,appid,icon})=>(
      <div id={appid} className="app-icon-container" onClick={e => this.handleClick(appid)}>
        <img src={process.env.PUBLIC_URL + icon} className="app-icon"/><br/>
        <label className="app-name">{name}</label>
      </div>
    ))}
  </div>
   );
  }
}

export default Dashboard;
