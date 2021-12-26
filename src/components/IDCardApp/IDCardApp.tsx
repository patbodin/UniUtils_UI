import React from 'react';
import ReactDOM, { render } from 'react-dom';
import RandomIDNumber from '../RandomIDNumber/RandomIDNumber';
import Select, { Options } from 'react-select'
import GetLastDigit from '../GetLastDigit/GetLastDigit';
import ValidateIDCard from '../ValidateIDCard/ValidateIDCard';

class IDCardApp extends React.Component<{},{loading:boolean,selectedApp:string}>{

  
  options = [
    { value: 'random', label: 'สุ่มเลขบัตรประชาชน' },
    { value: 'findlast', label: 'หาเลขตัวสุดท้าย' },
    { value: 'genid', label: 'สร้างเลขบัตรประชาชน' },
    { value: 'validate', label: 'ตรวจสอบบัตรประชาชน'}
  ];

  constructor(props:any){
    super(props);
    this.state = {
      loading : true,
      selectedApp : 'random'
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.getLayoutData();
  }

  async getLayoutData(){
    /* With Timeout */
    return await setTimeout(async () => {
    this.setState({loading:false})
    }, 1000);
  }

  renderCompoment(appID:string){
    switch(appID){
      case 'random':
        ReactDOM.render(
          <RandomIDNumber/>
          ,document.getElementById('container'));
        break;
      case 'findlast':
        ReactDOM.render(
          <GetLastDigit/>
          ,document.getElementById('container'));
        break;
      case 'genid':
        ReactDOM.render(
          <div id="container">ID Number</div>
          ,document.getElementById('container'));
        break;
      case 'validate':
        ReactDOM.render(
          <ValidateIDCard/>
          ,document.getElementById('container'));
        break;
    }
  }

  handleChange(event:any) {    
    this.setState({selectedApp:event.value});
    this.renderCompoment(event.value);
  }

  
  render(){
    if(this.state.loading){
      return(
        <div id="root">
        <div className="center-screen padding-content background-light round-border drop-shadow">
            <div className="label-skeleton animated-background"/><br/>
            <div className="label-skeleton animated-background"/><div className="label-skeleton animated-background"/>           
            <div className="label-skeleton animated-background"/><br/>
            <div className="input-skeleton-single-number animated-background"/> 
            <div className="input-skeleton-single-number animated-background"/>
            <div className="input-skeleton-single-number animated-background"/>
            <div className="input-skeleton-single-number animated-background"/>
            <div className="input-skeleton-single-number animated-background"/> 
            <div className="input-skeleton-single-number animated-background"/>
            <div className="input-skeleton-single-number animated-background"/>
            <div className="input-skeleton-single-number animated-background"/>
            <div className="input-skeleton-single-number animated-background"/>
            <div className="input-skeleton-single-number animated-background"/> 
            <div className="input-skeleton-single-number animated-background"/>
            <div className="input-skeleton-single-number animated-background"/> 
            <div className="input-skeleton-single-number animated-background"/>
            <br/>
            <div className="label-skeleton animated-background"/>
            <div className="input-skeleton-single-number animated-background"/>
            <div className="input-skeleton-single-number animated-background"/>
            <div className="input-skeleton-single-number animated-background"/>
            <div className="input-skeleton-single-number animated-background"/>
            <div className="input-skeleton-single-number animated-background"/>
          <br/>
          <div className="label-skeleton animated-background"/>
        </div>
      </div>
      );
    }
    return(
      <div id = "root">
        {this.state.selectedApp}
        <div>
        <Select options={this.options} onChange={this.handleChange} />
        </div>
        <div id = "container">
          <RandomIDNumber/>
        </div>
      </div>
    );
  }
}

export default IDCardApp;

