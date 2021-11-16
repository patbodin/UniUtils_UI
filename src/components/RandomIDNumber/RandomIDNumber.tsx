import React, {  } from 'react';
import ReactDOM from 'react-dom';
import RandomIDNumberList from '../RandomIDNumberList/RandomIDNumberList';
import IDNumberGenerator from '../IDNumberGenerator/IDNumberGenerator';
import Modal from "react-modal";

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
  urlProcess:string,loading:boolean,modalShow:boolean,modalTitle:string,modalMessage:string}>{

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
      modalShow:false,
      modalTitle:'',
      modalMessage:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.setState({modalShow:true,modalTitle:"ตรวจสอบหมายเลขบัตรประชาชน",modalMessage:isValid});
    
  }

  renderLastDigit(res:ILastDigit){
    ReactDOM.render(
      <div id="root">
        {this.state.urlProcess}<br/>
        {res.formattedidnumber}<br/>
        {res.lastdigit}
      </div>
      
      ,document.getElementById('root'));
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
  showModal = (e:any) => {
    this.setState({
      modalShow:!this.state.modalShow
    });
  };
  //Presenter
  render(){
    if(this.state.loading){
      return(
      <div id="root">
        <div>
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
