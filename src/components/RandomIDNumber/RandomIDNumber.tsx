import React, { useDebugValue, useState } from 'react';
import ReactDOM from 'react-dom';

interface IRandomIDHeader{
  result:string;
  message:string;
  totalnumber:number;
  exclusion:[];
  idnumberlist:IRandomItem[];
}
interface IRandomItem{
  idnumber:string;
  fullidnumber:string;
  formattedidnumber:string;
}

class RandomIDNumber extends React.Component<{},{idcount:number,excepted1:string,excepted2:string,excepted3:string,excepted4:string,excepted5:string}>{

  constructor(props:any){
    super(props);
    this.state = {
      idcount:0,
      excepted1 : '',
      excepted2 : '',
      excepted3 : '',
      excepted4 : '',
      excepted5 : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleExceptedChange = this.handleExceptedChange.bind(this)
  }

  //Service Operations
  getRandomIDNumber(count:number,except:string): Promise<IRandomIDHeader>{
    let url = 'http://10.138.46.91:5099/api/idnumbers/v1/randomidnumber?count='+count;
    if(except.length > 0){
      url += '&exclude='+except;
    }
    return fetch(url)
      .then(res => res.json())
      .then(res => {
        this.renderResult(res,url)
        return res as IRandomIDHeader
      })
  }

  renderResult(res:IRandomIDHeader,url:string){
  
    let idnumbers = res.idnumberlist
    ReactDOM.render(
      <div id="root">
        <label>{url}</label>
        <ul>
          {idnumbers.map(
           idnumber => 
            <li>
              <div className="list-item">
              {idnumber.idnumber}<br/>
               {idnumber.formattedidnumber}
              </div>
            </li>
          )}
        </ul>
      </div>
      ,document.getElementById('root'));
  }

  //Events 
  handleChange(event:any) {
    this.setState({idcount:this.validateCount(event.target.value)});
  }

  handleExceptedChange(event:any){
    var adjustValue = event.target.value;
    switch(event.target.id){
      case 'exept_1':
        this.setState({excepted1:this.validateExcept(adjustValue)})
        break;
      case 'exept_2':
        this.setState({excepted2:this.validateExcept(adjustValue)})
        break;
      case 'exept_3':
        this.setState({excepted3:this.validateExcept(adjustValue)})
        break;
      case 'exept_4':
        this.setState({excepted4:this.validateExcept(adjustValue)})
        break;
      case 'exept_5':
        this.setState({excepted5:this.validateExcept(adjustValue)})
        break;
    }
  }

  validateCount (count:number):number{
    var retValue = count;
    if(count < 0){ 
      retValue = 0;
    }else if(count > 50){
      retValue = 50;
    }
    return(retValue);
  }

  validateExcept(except:string):string{
    var retString = '';
    const regx = /^[0-9\b]+$/;
    if(except === '' || regx.test(except)){
      if(String.length > 1){
        retString = '';
      }else{
        retString = except;
      }
    }
    return retString;
  }

  handleSubmit(event:any) {
    //alert('You will Generate IDs for : ' + this.state.idcount);
    var exclude = '';
    if(this.state.excepted1 != '') exclude+= this.state.excepted1;
    if(this.state.excepted2 != '') exclude+= this.state.excepted2;
    if(this.state.excepted3 != '') exclude+= this.state.excepted3;
    if(this.state.excepted4 != '') exclude+= this.state.excepted4;
    if(this.state.excepted5 != '') exclude+= this.state.excepted5;
    
    this.getRandomIDNumber(this.state.idcount,exclude);
    event.preventDefault();
  }
  //Presenter
  render(){
    return(
      <div id="root">
      <form onSubmit={this.handleSubmit}>
        <div className="input-form">
          <label>
            ระบุจำนวนหมายเลขบัตรประชาชน ที่ต้องการ <br/>
            จำนวน <input id="id_count" type="number" className="twin-number-text" value={this.state.idcount} onChange={this.handleChange} min={0} max={50}/><br/>
            หมายเลขที่ไม่ต้องการ 
            <input id="exept_1" type="number" className="single-number-text" value={this.state.excepted1} onChange={this.handleExceptedChange} min={0} max={9} maxLength={1}/>
            <input id="exept_2" type="number" className="single-number-text" value={this.state.excepted2} onChange={this.handleExceptedChange} min={0} max={9} maxLength={1}/>
            <input id="exept_3" type="number" className="single-number-text" value={this.state.excepted3} onChange={this.handleExceptedChange} min={0} max={9} maxLength={1}/>
            <input id="exept_4" type="number" className="single-number-text" value={this.state.excepted4} onChange={this.handleExceptedChange} min={0} max={9} maxLength={1}/>
            <input id="exept_5" type="number" className="single-number-text" value={this.state.excepted5} onChange={this.handleExceptedChange} min={0} max={9} maxLength={1}/>
          </label>
          <br/>
          <button type="submit" >สร้างเลขบัตรประชาชน</button>
        </div>
      </form>
    </div>
    );
  }
}

export default RandomIDNumber;
