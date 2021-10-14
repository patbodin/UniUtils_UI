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

class RandomIDNumber extends React.Component<{},{idcount:number,excepted:number[]}>{

  constructor(props:any){
    super(props);
    this.state = {
      idcount:0,
      excepted : []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleExceptedChange = this.handleExceptedChange.bind(this)
  }

  //Service Operations
  getRandomIDNumber(count:number): Promise<IRandomIDHeader>{
    let url = 'http://10.138.46.91:5099/api/idnumbers/v1/randomidnumber?count='+count;
    return fetch(url)
      .then(res => res.json())
      .then(res => {
        this.renderResult(res)
        return res as IRandomIDHeader
      })
  }

  renderResult(res:IRandomIDHeader){
  
    let idnumbers = res.idnumberlist
    ReactDOM.render(
      <div id="root">
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
    adjustValue = this.validateExcepted(event.target.value);
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

  validateExcepted(except:number):number{
    var retValue = except;
    if(except < 0){
      except = 0;
    }else if(except > 9){
      except = 9;
    }
    return retValue;
  }

  handleSubmit(event:any) {
    alert('You will Generate IDs for : ' + this.state.idcount);
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
            <input id="exept_1" type="number" className="single-number-text" value={this.state.excepted[0]} onChange={this.handleExceptedChange} min={0} max={9} maxLength={1}/>
            <input id="exept_2" type="number" className="single-number-text" value={this.state.excepted[1]} onChange={this.handleExceptedChange} min={0} max={9} maxLength={1}/>
            <input id="exept_3" type="number" className="single-number-text" value={this.state.excepted[2]} onChange={this.handleExceptedChange} min={0} max={9} maxLength={1}/>
            <input id="exept_4" type="number" className="single-number-text" value={this.state.excepted[3]} onChange={this.handleExceptedChange} min={0} max={9} maxLength={1}/>
            <input id="exept_5" type="number" className="single-number-text" value={this.state.excepted[4]} onChange={this.handleExceptedChange} min={0} max={9} maxLength={1}/>
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
