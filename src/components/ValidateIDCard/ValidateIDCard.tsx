import React from 'react';


class ValidateIDCard extends React.Component<{},{loading:boolean,idn1:string,idn2:string,idn3:string,idn4:string,idn5:string,idn6:string,idn7:string,
  idn8:string,idn9:string,idn10:string,idn11:string,idn12:string,idn13:string}>{
  
  constructor(props:any){
    super(props);
    this.state = {
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
      idn13:''
    };
    this.handleChange = this.handleChange.bind(this);
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
          </div>
        </div>
      );
  }
}

export default ValidateIDCard;
