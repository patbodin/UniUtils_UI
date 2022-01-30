import { throws } from 'assert';
import React from 'react';
import IdCardRequestInput from '../IdCardRequestInput/IdCardRequestInput';
import MultipleIDCardGenerator from '../MultipleIDCardGenerator/MultipleIDCardGenerator';
import ReactDOM from 'react-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

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

interface Digits{
  digit1:string,
  digit2:string,
  digit3:string,
  digit4:string,
  digit5:string,
  digit6:string,
  digit7:string,
  digit8:string,
  digit9:string,
  digit10:string,
  digit11:string,
  digit12:string,
  digit13:string
}

class GetLastDigit extends React.Component<{},{componentList?: any[],numComponents:number,loading:boolean,idn1:string,idn2:string,idn3:string,idn4:string,idn5:string,idn6:string,idn7:string,
  idn8:string,idn9:string,idn10:string,idn11:string,idn12:string,idn13:string,requestDigitList:Digits[]}>{
  constructor(props:any){
    super(props);
    this.state = {
      componentList:[],
      numComponents:0,
      loading:true,
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
      requestDigitList:[]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async getLayoutData(){
    /* With Timeout */
    return await setTimeout(async () => {
    this.setState({
      loading:false})
    }, 1000) 
  }
  componentDidMount(){
    this.getLayoutData();
  }

  handleChange(event:any) {
    switch(event.target.id){
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
      default:break;
    }
  }

  validateDigits(num:number):number{
    var retValue = num
    if(num < 0){ retValue = 0;}
    if(num > 9) {retValue = 9;}
    return (retValue);
  }

  handleSubmit(event:any) {
    alert(this.state.componentList?.length);
    let request = this.makeIDRequest();
    this.getLastDigit(request);
  }
  getLastDigit(idCardRequest:string):Promise<ILastDigit>{
    let url = 'http://10.138.46.91:5099/api/idnumbers/v1/getlastdigit/'+idCardRequest;
    return fetch(url)
      .then(res => res.json())
      .then(res => {
        this.renderLastDigit(res);
        return res as ILastDigit;
      })
  }
  renderLastDigit(res:ILastDigit){
    this.displayAlert('ตัวเลขหลักสุดท้าย',"เลขตัวสุดท้าย "+ res.lastdigit+" บัตรประชาชนเต็ม "+res.formattedidnumber);
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
  makeIDRequest():string{
    var requestID = '';

    if(this.state.idn1.toString() == ''){ requestID += ''; } else {requestID += this.state.idn1.toString()}
    if(this.state.idn2.toString() == ''){ requestID += ''; } else {requestID += this.state.idn2.toString()}
    if(this.state.idn3.toString() == ''){ requestID += ''; } else {requestID += this.state.idn3.toString()}
    if(this.state.idn4.toString() == ''){ requestID += ''; } else {requestID += this.state.idn4.toString()}
    if(this.state.idn5.toString() == ''){ requestID += ''; } else {requestID += this.state.idn5.toString()}
    if(this.state.idn6.toString() == ''){ requestID += ''; } else {requestID += this.state.idn6.toString()}
    if(this.state.idn7.toString() == ''){ requestID += ''; } else {requestID += this.state.idn7.toString()}
    if(this.state.idn8.toString() == ''){ requestID += ''; } else {requestID += this.state.idn8.toString()}
    if(this.state.idn9.toString() == ''){ requestID += ''; } else {requestID += this.state.idn9.toString()}
    if(this.state.idn10.toString() == ''){ requestID += ''; } else {requestID += this.state.idn10.toString()}
    if(this.state.idn11.toString() == ''){ requestID += ''; } else {requestID += this.state.idn11.toString()}
    if(this.state.idn12.toString() == ''){ requestID += ''; } else {requestID += this.state.idn12.toString()}
    if(this.state.idn13.toString() == ''){ requestID += ''; } else {requestID += this.state.idn13.toString()}

    return requestID;
  }
  render() {
    if(this.state.loading){
      return(
      <div id="container">
        <div className="center-screen padding-content background-light round-border drop-shadow">        
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
        </div>
      </div>);
    }
    return(
      <div id="container">
        <div className="center-screen padding-content background-light round-border drop-shadow">
            <label>ระบุเลขบัตรประชาชน 12 หลักแรก</label><br/>
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
        </div>
        <br/><button type="button" >เพิ่มการค้นหา</button>
        <br/><button type='button' onClick={this.handleSubmit}>หาเลขตัวสุดท้าย</button>
      </div>
    );
  }  
  }

export default GetLastDigit;
