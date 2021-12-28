import { throws } from 'assert';
import React from 'react';
import IdCardRequestInput from '../IdCardRequestInput/IdCardRequestInput';
import MultipleIDCardGenerator from '../MultipleIDCardGenerator/MultipleIDCardGenerator';
import ReactDOM from 'react-dom';

class GetLastDigit extends React.Component<{},{componentList?: IdCardRequestInput[],numComponents:number}>{
  constructor(props:any){
    super(props);
    this.state = {
      componentList:[],
      numComponents:0
    };
    this.onAddClick = this.onAddClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  public onAddClick(event:any){
    this.setState({numComponents: this.state.numComponents + 1});
  }

  makeRequestFromComponent(requestItem:IdCardRequestInput):string{
    var requestID = "";
    if(requestItem.state.toString() == ''){ requestID += '_'; } else {requestID += requestItem.state.idn1.toString()}
    if(requestItem.state.toString() == ''){ requestID += '_'; } else {requestID += requestItem.state.idn2.toString()}
    if(requestItem.state.toString() == ''){ requestID += '_'; } else {requestID += requestItem.state.idn3.toString()}
    if(requestItem.state.toString() == ''){ requestID += '_'; } else {requestID += requestItem.state.idn4.toString()}
    if(requestItem.state.toString() == ''){ requestID += '_'; } else {requestID += requestItem.state.idn5.toString()}
    if(requestItem.state.toString() == ''){ requestID += '_'; } else {requestID += requestItem.state.idn6.toString()}
    if(requestItem.state.toString() == ''){ requestID += '_'; } else {requestID += requestItem.state.idn7.toString()}
    if(requestItem.state.toString() == ''){ requestID += '_'; } else {requestID += requestItem.state.idn8.toString()}
    if(requestItem.state.toString() == ''){ requestID += '_'; } else {requestID += requestItem.state.idn9.toString()}
    if(requestItem.state.toString() == ''){ requestID += '_'; } else {requestID += requestItem.state.idn10.toString()}
    if(requestItem.state.toString() == ''){ requestID += '_'; } else {requestID += requestItem.state.idn11.toString()}
    if(requestItem.state.toString() == ''){ requestID += '_'; } else {requestID += requestItem.state.idn12.toString()}
    if(requestItem.state.toString() == ''){ requestID += '_'; } else {requestID += requestItem.state.idn13.toString()}
    return requestID;
  }

  makeIDRequestMultiple():string{
    var request = "";
    request += '{ "idnumberlist":[';
    for(var comp in this.state.componentList){
       let inputCom = comp as unknown as IdCardRequestInput;
       request += '"'+this.makeRequestFromComponent(inputCom)+'",';
    }
    request += ']}';
    var re = /,]/gi;

    //return request.replace(re,"]");
    return '{"idnumberlist": ["123456789123","993456789123","123888889123"]}';
  }

  handleSubmit(event:any) {
    let request = this.makeIDRequestMultiple();
    ReactDOM.render(
      <MultipleIDCardGenerator request={request} />
      ,document.getElementById('root'));
  }
  clickedComponents = () => {
    let componentArray: any[] = [];
    for (let i=0; i<this.state.numComponents; i++) {
        componentArray.push(<IdCardRequestInput />);
    }
    return componentArray;
  }

  render() {
    return(
      <div id="container">
        { this.state.componentList?.map(function(component, index) 
          {
            return IdCardRequestInput
          })}
          <div className="center-horizontal">
          <React.Fragment>
            {this.clickedComponents()}
            <button type="button" onClick={this.onAddClick}>เพิ่มการค้นหา</button><br/>
          </React.Fragment>
          <form onSubmit={this.handleSubmit} >
            <button type="submit">ค้นหาเลขท้าย</button>
          </form>
          </div>
      </div>
    );
  }
}

export default GetLastDigit;
