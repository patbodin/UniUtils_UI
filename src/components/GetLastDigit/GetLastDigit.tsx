import { throws } from 'assert';
import React from 'react';
import IdCardRequestInput from '../IdCardRequestInput/IdCardRequestInput';


class GetLastDigit extends React.Component<{},{componentList?: IdCardRequestInput[],numComponents:number}>{
  constructor(props:any){
    super(props);
    this.state = {
      componentList:[],
      numComponents:0
    };
    this.onAddClick = this.onAddClick.bind(this);
    if(this.state.numComponents <= 0){
      this.setState({numComponents: this.state.numComponents + 1});
    }
  }

  public onAddClick(event:any){
    this.setState({numComponents: this.state.numComponents + 1});
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
          </div>
      </div>
    );
  }
}

export default GetLastDigit;
