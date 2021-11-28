import React, { useState } from 'react';
import ReactDOM, { render } from 'react-dom';
import RandomIDNumberList from '../RandomIDNumberList/RandomIDNumberList';
import IDNumberGenerator from '../IDNumberGenerator/IDNumberGenerator';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

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

class RandomIDNumber extends React.Component<{},{idcount:string,
  exclude1:string,exclude2:string,exclude3:string,exclude4:string,exclude5:string,
  idn1:string,idn2:string,idn3:string,idn4:string,idn5:string,idn6:string,idn7:string,
  idn8:string,idn9:string,idn10:string,idn11:string,idn12:string,idn13:string,
  urlProcess:string,loading:boolean,show:boolean,modalTitle:string,modalMessage:string}>{

  constructor(props:any){
    super(props);
    this.state = {
      idcount:'',
      exclude1 : '',
      exclude2 : '',
      exclude3 : '',
      exclude4 : '',
      exclude5 : '',
      idn1:'',
      idn2:'',
      idn3:'',
      idn4:'',
      idn5:'',
      idn6:'',
      idn7:'',
      idn8:'',
      idn9:'',
      idn10:'',
      idn11:'',
      idn12:'',
      idn13:'',
      urlProcess:'',
      loading:true,
      show:false,
      modalTitle:'Modal Title',
      modalMessage:'Modal Message let you know, someone show something somewhere in sometime.'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);

  }

  //Service Operations

  getLastDigit(idCardRequest:string):Promise<ILastDigit>{
    let url = 'http://10.138.46.91:5099/api/idnumbers/v1/getlastdigit/'+idCardRequest;
    this.setState({urlProcess:url});
    return fetch(url)
      .then(res => res.json())
      .then(res => {
        this.renderLastDigit(res);
        return res as ILastDigit;
      })
  }

  getValidIDCard(idCardRequest:string):Promise<IValidIDCard>{
    let url = 'http://10.138.46.91:5099/api/idnumbers/v1/isvalid/'+idCardRequest;
    this.setState({urlProcess:url});
    return fetch(url)
      .then(res => res.json())
      .then(res => {
        this.renderValidIDNumber(this.props,res);
        return res as IValidIDCard;
      })
  }

  //Renders
  renderRandomIDNumber(){
    ReactDOM.render(
      <RandomIDNumberList count={parseInt( this.state.idcount)} except={this.makeExclude()} />
      ,document.getElementById('root'));
  }

  renderIDCardGenerator(){
    ReactDOM.render(
      <IDNumberGenerator request={this.makeIDRequest()}/>
      ,document.getElementById('root'));
  }

  renderValidIDNumber(props:any,res:IValidIDCard){
    let isValid = '';
    if(res.isValid){
      isValid = 'หมายเลขประชาชนถูกต้อง';
    }else{
      isValid = 'หมายเลขประชาชนไม่ถูกต้อง';
    }
    this.displayAlert('ตรวจสอบบัตรประชาชน',isValid);
  }

  displayAlert(topic:string, detail:string){
    confirmAlert({
      title: topic,
      message: detail,
      buttons: [
        {
          label: 'ปิด',
          onClick: () => {}//alert('Click Yes')
        }
      ]
    });
  }

  submit = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Click Yes')
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    });
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  renderLastDigit(res:ILastDigit){
    this.displayAlert('เลขท้ายที่ออก',res.lastdigit);
  }

  async getLayoutData(){
    /* With Timeout */
    return await setTimeout(async () => {
    this.setState({loading:false})
    }, 1000) 
  }
  componentDidMount(){
    this.getLayoutData();
  }

  //Events 
  handleChange(event:any) {
    switch(event.target.id){
      case 'id_count':
        this.setState({idcount:this.validateCount(event.target.value).toString()});
        break;
      case 'idn1':
        this.setState({idn1:this.validateDigits(event.target.value).toString()});
        break;
      case 'idn2':
        this.setState({idn2:this.validateDigits(event.target.value).toString()});
        break;
      case 'idn3':
        this.setState({idn3:this.validateDigits(event.target.value).toString()});
        break;
      case 'idn4':
        this.setState({idn4:this.validateDigits(event.target.value).toString()});
        break;
      case 'idn5':
        this.setState({idn5:this.validateDigits(event.target.value).toString()});
        break;
      case 'idn6':
        this.setState({idn6:this.validateDigits(event.target.value).toString()});
        break;
      case 'idn7':
        this.setState({idn7:this.validateDigits(event.target.value).toString()});
        break;
      case 'idn8':
        this.setState({idn8:this.validateDigits(event.target.value).toString()});
        break;
      case 'idn9':
        this.setState({idn9:this.validateDigits(event.target.value).toString()});
        break;
      case 'idn10':
        this.setState({idn10:this.validateDigits(event.target.value).toString()});
        break;
      case 'idn11':
        this.setState({idn11:this.validateDigits(event.target.value).toString()});
        break;
      case 'idn12':
        this.setState({idn12:this.validateDigits(event.target.value).toString()});
        break;
      case 'idn13':
        this.setState({idn13:this.validateDigits(event.target.value).toString()});
        break;
      case 'exclude1':
        this.setState({exclude1:this.validateDigits(event.target.value).toString()});
        break;
      case 'exclude2':
        this.setState({exclude2:this.validateDigits(event.target.value).toString()});
        break;
      case 'exclude3':
        this.setState({exclude3:this.validateDigits(event.target.value).toString()});
        break;
      case 'exclude4':
        this.setState({exclude4:this.validateDigits(event.target.value).toString()});
        break;
      case 'exclude5':
        this.setState({exclude5:this.validateDigits(event.target.value).toString()});
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
    //var exclude = this.makeExclude();
    //this.getRandomIDNumber(this.state.idcount,exclude);
    let idRequest = this.makeIDRequest();
    let digitCount = this.idNumberDigitCount();
    let missingLast = this.isMissingLastDigit();
    let count = this.state.idcount;
    let excludes = this.makeExclude();

    if(digitCount > 0){
      if(digitCount < 13){
        if(this.isMissingLastDigit()){
          alert('Select Get Last Digit');
          this.getLastDigit(this.makeIDLastDigitRequest(idRequest));
        }else{
          alert('Select ID Number Generator');
          //this.getIDNumberGenerator(idRequest);
          this.renderIDCardGenerator();
        }
      }else{
        //alert('Select Vilide ID Card');
        this.getValidIDCard(idRequest);
      }
    }else{
      alert('Select Random ID Number');
      this.renderRandomIDNumber();
    }

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
    if(this.state.idn13.toString() == ''){
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

    if(this.state.idn1.toString() == ''){ requestID += '_'; } else {requestID += this.state.idn1.toString()}
    if(this.state.idn2.toString() == ''){ requestID += '_'; } else {requestID += this.state.idn2.toString()}
    if(this.state.idn3.toString() == ''){ requestID += '_'; } else {requestID += this.state.idn3.toString()}
    if(this.state.idn4.toString() == ''){ requestID += '_'; } else {requestID += this.state.idn4.toString()}
    if(this.state.idn5.toString() == ''){ requestID += '_'; } else {requestID += this.state.idn5.toString()}
    if(this.state.idn6.toString() == ''){ requestID += '_'; } else {requestID += this.state.idn6.toString()}
    if(this.state.idn7.toString() == ''){ requestID += '_'; } else {requestID += this.state.idn7.toString()}
    if(this.state.idn8.toString() == ''){ requestID += '_'; } else {requestID += this.state.idn8.toString()}
    if(this.state.idn9.toString() == ''){ requestID += '_'; } else {requestID += this.state.idn9.toString()}
    if(this.state.idn10.toString() == ''){ requestID += '_'; } else {requestID += this.state.idn10.toString()}
    if(this.state.idn11.toString() == ''){ requestID += '_'; } else {requestID += this.state.idn11.toString()}
    if(this.state.idn12.toString() == ''){ requestID += '_'; } else {requestID += this.state.idn12.toString()}
    if(this.state.idn13.toString() == ''){ requestID += '_'; } else {requestID += this.state.idn13.toString()}

    return requestID;
  }
  makeIDLastDigitRequest(input:String):string{
    var retString = '';
    retString = input.replace('_','');
    return retString;
  }
  //Presenter
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
      </div>)
    }
    return(
      <div id="root">
      <form onSubmit={this.handleSubmit} >
        <div className="center-screen padding-content background-light round-border drop-shadow">
          <h1>ระบุจำนวนหมายเลขบัตรประชาชน ที่ต้องการ</h1> <br/>
          
            <label>จำนวน</label> <input id="id_count" type="number" className="input-multiple-text round-border" value={this.state.idcount} onChange={this.handleChange} min={0} max={50}/> <label>หมายเลข</label><br/>
            <label>รูปแบบที่ต้องการ</label><br/>
            <p className="remark">ใส่เลขบัตรประชาชนบางหลักที่ต้องการเพื่อหาเลขบัตรประชาชนตามรูปแบบที่ต้องการ
          หรือใส่ให้ครบเพื่อตรวจสอบความถูกต้องของบัตรประชาชน</p><br/>
            <input id="idn1" type="number" maxLength={1} className="input-single-text round-border" value={this.state.idn1} onChange={this.handleChange}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input id="idn2" type="number" maxLength={1} className="input-single-text round-border" value={this.state.idn2} onChange={this.handleChange}/>&nbsp;
            <input id="idn3" type="number" maxLength={1} className="input-single-text round-border" value={this.state.idn3} onChange={this.handleChange}/>&nbsp;
            <input id="idn4" type="number" maxLength={1} className="input-single-text round-border" value={this.state.idn4} onChange={this.handleChange}/>&nbsp;
            <input id="idn5" type="number" maxLength={1} className="input-single-text round-border" value={this.state.idn5} onChange={this.handleChange}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input id="idn6" type="number" maxLength={1} className="input-single-text round-border" value={this.state.idn6} onChange={this.handleChange}/>&nbsp;
            <input id="idn7" type="number" maxLength={1} className="input-single-text round-border" value={this.state.idn7} onChange={this.handleChange}/>&nbsp;
            <input id="idn8" type="number" maxLength={1} className="input-single-text round-border" value={this.state.idn8} onChange={this.handleChange}/>&nbsp;
            <input id="idn9" type="number" maxLength={1} className="input-single-text round-border" value={this.state.idn9} onChange={this.handleChange}/>&nbsp;
            <input id="idn10" type="number" maxLength={1} className="input-single-text round-border" value={this.state.idn10} onChange={this.handleChange}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input id="idn11" type="number" maxLength={1} className="input-single-text round-border" value={this.state.idn11} onChange={this.handleChange}/>&nbsp;
            <input id="idn12" type="number" maxLength={1} className="input-single-text round-border" value={this.state.idn12} onChange={this.handleChange}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input id="idn13" type="number" maxLength={1} className="input-single-text round-border" value={this.state.idn13} onChange={this.handleChange}/>&nbsp;
            <br/>
            <label>หมายเลขที่ไม่ต้องการ</label>&nbsp;
            <input id="exclude1" type="number" className="input-single-text round-border" value={this.state.exclude1} onChange={this.handleChange} min={0} max={9} maxLength={1}/>&nbsp;
            <input id="exclude2" type="number" className="input-single-text round-border" value={this.state.exclude2} onChange={this.handleChange} min={0} max={9} maxLength={1}/>&nbsp;
            <input id="exclude3" type="number" className="input-single-text round-border" value={this.state.exclude3} onChange={this.handleChange} min={0} max={9} maxLength={1}/>&nbsp;
            <input id="exclude4" type="number" className="input-single-text round-border" value={this.state.exclude4} onChange={this.handleChange} min={0} max={9} maxLength={1}/>&nbsp;
            <input id="exclude5" type="number" className="input-single-text round-border" value={this.state.exclude5} onChange={this.handleChange} min={0} max={9} maxLength={1}/>
          
          <br/>
          <button type="submit" >สร้างเลขบัตรประชาชน</button>
        </div>
      </form>    
    </div>
    );
  }
}

export default RandomIDNumber;
