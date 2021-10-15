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

interface IIDCardNumber{
  result:string,
  message:string,
  idnumber:string,
  fullidnumber:string,
  formattedidnumber:string,
  replacestring:string,
  exclusion:[],
  datetime:string,
  timestamp:string
}

interface ILastDigit{
  result:string,
  message:string,
  idnumber:string,
  fullidnumber:string,
  formattedidnumber:string,
  lastdigit:string,
  datetime:string,
  timestamp:string
}

interface IValidIDCard{
  isValid:boolean
}

class RandomIDNumber extends React.Component<{},{idcount:number,
  exclude1:number,exclude2:number,exclude3:number,exclude4:number,exclude5:number,
  idn1:number,idn2:number,idn3:number,idn4:number,idn5:number,idn6:number,idn7:number,idn8:number,idn9:number,idn10:number,idn11:number,idn12:number,idn13:number}>{

  constructor(props:any){
    super(props);
    this.state = {
      idcount:0,
      exclude1 : 0,
      exclude2 : 0,
      exclude3 : 0,
      exclude4 : 0,
      exclude5 : 0,
      idn1:0,
      idn2:0,
      idn3:0,
      idn4:0,
      idn5:0,
      idn6:0,
      idn7:0,
      idn8:0,
      idn9:0,
      idn10:0,
      idn11:0,
      idn12:0,
      idn13:0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
       // this.renderResult(res,url)
        return res as IRandomIDHeader;
      })
  }

  getIDNumberGenerator(idCardRequest:string):Promise<IIDCardNumber>{
    let url = 'http://10.138.46.91:5099/api/idnumbers/v1/idnumbergenerator/'+idCardRequest;
    
    return fetch(url)
      .then(res => res.json())
      .then(res => {
        //this.renderResult(res,url)
        return res as IIDCardNumber;
      })
  }

  getLastDigit(idCardRequest:string):Promise<ILastDigit>{
    let url = 'http://10.138.46.91:5099/api/idnumbers/v1/getlastdigit/'+idCardRequest;
    
    return fetch(url)
      .then(res => res.json())
      .then(res => {
        //this.renderResult(res,url)
        return res as ILastDigit;
      })
  }

  getValidIDCard(idCardRequest:string):Promise<IValidIDCard>{
    let url = 'http://10.138.46.91:5099/api/idnumbers/v1/isvalid/'+idCardRequest;
    
    return fetch(url)
      .then(res => res.json())
      .then(res => {
        this.renderRandomIDNumber(res)
        return res as IValidIDCard;
      })
  }

  //Renders
  renderRandomIDNumber(res:IRandomIDHeader){
  
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
    switch(event.target.id){
      case 'id_count':
        this.setState({idcount:this.validateCount(event.target.value)});
        break;
      case 'idn1':
        this.setState({idn1:this.validateDigits(event.target.value)});
        break;
      case 'idn2':
        this.setState({idn2:this.validateDigits(event.target.value)});
        break;
      case 'idn3':
        this.setState({idn3:this.validateDigits(event.target.value)});
        break;
      case 'idn4':
        this.setState({idn4:this.validateDigits(event.target.value)});
        break;
      case 'idn5':
        this.setState({idn5:this.validateDigits(event.target.value)});
        break;
      case 'idn6':
        this.setState({idn6:this.validateDigits(event.target.value)});
        break;
      case 'idn7':
        this.setState({idn7:this.validateDigits(event.target.value)});
        break;
      case 'idn8':
        this.setState({idn8:this.validateDigits(event.target.value)});
        break;
      case 'idn9':
        this.setState({idn9:this.validateDigits(event.target.value)});
        break;
      case 'idn10':
        this.setState({idn10:this.validateDigits(event.target.value)});
        break;
      case 'idn11':
        this.setState({idn11:this.validateDigits(event.target.value)});
        break;
      case 'idn12':
        this.setState({idn12:this.validateDigits(event.target.value)});
        break;
      case 'idn13':
        this.setState({idn13:this.validateDigits(event.target.value)});
        break;
      case 'exclude1':
        this.setState({exclude1:this.validateDigits(event.target.value)});
        break;
      case 'exclude2':
        this.setState({exclude2:this.validateDigits(event.target.value)});
        break;
      case 'exclude3':
        this.setState({exclude3:this.validateDigits(event.target.value)});
        break;
      case 'exclude4':
        this.setState({exclude4:this.validateDigits(event.target.value)});
        break;
      case 'exclude5':
        this.setState({exclude5:this.validateDigits(event.target.value)});
        break;
      default:break;

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

  validateDigits(num:number):number{
    var retValue = num
    if(num < 0){ retValue = 0;}
    if(num > 9) {retValue = 9;}
    return (retValue);
  }

  handleSubmit(event:any) {
    //alert('You will Generate IDs for : ' + this.state.idcount);
    var exclude = this.makeExclude();
    this.getRandomIDNumber(this.state.idcount,exclude);
    event.preventDefault();
  }
  //Input Analyst
  idNumberDigitCount():number{
    var count = 0;
    if(this.state.idn1.toString() != '') count += 1;
    if(this.state.idn2.toString() != '') count += 1;
    if(this.state.idn3.toString() != '') count += 1;
    if(this.state.idn4.toString() != '') count += 1;
    if(this.state.idn5.toString() != '') count += 1;
    if(this.state.idn6.toString() != '') count += 1;
    if(this.state.idn7.toString() != '') count += 1;
    if(this.state.idn8.toString() != '') count += 1;
    if(this.state.idn9.toString() != '') count += 1;
    if(this.state.idn10.toString() != '') count += 1;
    if(this.state.idn11.toString() != '') count += 1;
    if(this.state.idn12.toString() != '') count += 1;
    if(this.state.idn13.toString() != '') count += 1;

    return count;
  }

  isMissingLastDigit():boolean{
    if(this.state.idn13.toString() != ''){
      return true;
    }else{
      return false;
    }
  }

  makeExclude():string{
    var exclude = '';
    if(this.state.exclude1.toString() != '') exclude+= this.state.exclude1;
    if(this.state.exclude2.toString() != '') exclude+= this.state.exclude2;
    if(this.state.exclude3.toString() != '') exclude+= this.state.exclude3;
    if(this.state.exclude4.toString() != '') exclude+= this.state.exclude4;
    if(this.state.exclude5.toString() != '') exclude+= this.state.exclude5;
    return exclude;
  }

  makeIDRequest():string{
    var requestID = '';

    if(this.state.idn1.toString() != ''){ requestID += '_'; } else {requestID += this.state.idn1.toString()}
    if(this.state.idn2.toString() != ''){ requestID += '_'; } else {requestID += this.state.idn2.toString()}
    if(this.state.idn3.toString() != ''){ requestID += '_'; } else {requestID += this.state.idn3.toString()}
    if(this.state.idn4.toString() != ''){ requestID += '_'; } else {requestID += this.state.idn4.toString()}
    if(this.state.idn5.toString() != ''){ requestID += '_'; } else {requestID += this.state.idn5.toString()}
    if(this.state.idn6.toString() != ''){ requestID += '_'; } else {requestID += this.state.idn6.toString()}
    if(this.state.idn7.toString() != ''){ requestID += '_'; } else {requestID += this.state.idn7.toString()}
    if(this.state.idn8.toString() != ''){ requestID += '_'; } else {requestID += this.state.idn8.toString()}
    if(this.state.idn9.toString() != ''){ requestID += '_'; } else {requestID += this.state.idn9.toString()}
    if(this.state.idn10.toString() != ''){ requestID += '_'; } else {requestID += this.state.idn10.toString()}
    if(this.state.idn11.toString() != ''){ requestID += '_'; } else {requestID += this.state.idn11.toString()}
    if(this.state.idn12.toString() != ''){ requestID += '_'; } else {requestID += this.state.idn12.toString()}
    if(this.state.idn13.toString() != ''){ requestID += '_'; } else {requestID += this.state.idn13.toString()}

    return requestID;
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
            รูปแบบที่ต้องการ<br/>
            <input id="idn1" type="number" maxLength={1} className="single-number-text" value={this.state.idn1} onChange={this.handleChange}/> - 
            <input id="idn2" type="number" maxLength={1} className="single-number-text" value={this.state.idn2} onChange={this.handleChange}/>
            <input id="idn3" type="number" maxLength={1} className="single-number-text" value={this.state.idn3} onChange={this.handleChange}/>
            <input id="idn4" type="number" maxLength={1} className="single-number-text" value={this.state.idn4} onChange={this.handleChange}/>
            <input id="idn5" type="number" maxLength={1} className="single-number-text" value={this.state.idn5} onChange={this.handleChange}/> - 
            <input id="idn6" type="number" maxLength={1} className="single-number-text" value={this.state.idn6} onChange={this.handleChange}/>
            <input id="idn7" type="number" maxLength={1} className="single-number-text" value={this.state.idn7} onChange={this.handleChange}/>
            <input id="idn8" type="number" maxLength={1} className="single-number-text" value={this.state.idn8} onChange={this.handleChange}/>
            <input id="idn9" type="number" maxLength={1} className="single-number-text" value={this.state.idn9} onChange={this.handleChange}/>
            <input id="idn10" type="number" maxLength={1} className="single-number-text" value={this.state.idn10} onChange={this.handleChange}/> - 
            <input id="idn11" type="number" maxLength={1} className="single-number-text" value={this.state.idn11} onChange={this.handleChange}/>
            <input id="idn12" type="number" maxLength={1} className="single-number-text" value={this.state.idn12} onChange={this.handleChange}/> - 
            <input id="idn13" type="number" maxLength={1} className="single-number-text" value={this.state.idn13} onChange={this.handleChange}/>
            <br/>
            หมายเลขที่ไม่ต้องการ 
            <input id="exclude1" type="number" className="single-number-text" value={this.state.exclude1} onChange={this.handleChange} min={0} max={9} maxLength={1}/>
            <input id="exclude2" type="number" className="single-number-text" value={this.state.exclude2} onChange={this.handleChange} min={0} max={9} maxLength={1}/>
            <input id="exclude3" type="number" className="single-number-text" value={this.state.exclude3} onChange={this.handleChange} min={0} max={9} maxLength={1}/>
            <input id="exclude4" type="number" className="single-number-text" value={this.state.exclude4} onChange={this.handleChange} min={0} max={9} maxLength={1}/>
            <input id="exclude5" type="number" className="single-number-text" value={this.state.exclude5} onChange={this.handleChange} min={0} max={9} maxLength={1}/>
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
