import { throws } from 'assert';
import { loadavg } from 'os';
import React from 'react';
import ReactDOM, { render } from 'react-dom'
import { isThisTypeNode } from 'typescript';

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

class RandomIDNumberList extends React.Component<{count:number,except:string},{loading:boolean}>{

  idcards : IRandomIDHeader | undefined

  constructor(props:any){
    super(props);
    this.state={
      loading:true
    }
  }
  async loadingAndShow(res:IRandomIDHeader){
    /* With Timeout */
    this.renderSkeleton(res);
    return await setTimeout(async () => {
    this.setState({loading:false})
    this.renderData(res)
    }, 3000) 
  }
  componentDidMount(){
    this.getData();
  }

  //Service 
  getData(): Promise<IRandomIDHeader>{
    
    //Pre-Render full screen
    let url = 'http://10.138.46.91:5099/api/idnumbers/v1/randomidnumber?count='+this.props.count;
    if(this.props.except.length > 0){
      url += '&exclude='+this.props.except;
    }
    
    return fetch(url)
      .then(res => res.json())
      .then(res => {
        this.loadingAndShow(res)
        return res as IRandomIDHeader;
      })
  }
  renderData(res:IRandomIDHeader){
    let idnumbers = res.idnumberlist
    ReactDOM.render(
      <div id="root">
          {idnumbers.map(
           idnumber => 
              <div className="idcard-list">
               <label className="idnumber-main">เลขบัตรประชาชน {idnumber.idnumber}</label><br/>
               <label className="idnumber-subline">{idnumber.formattedidnumber}</label>
              </div>
          )}
      </div>
      ,document.getElementById('root'));
  }

  renderSkeleton(res:IRandomIDHeader){
    let idnumbers = res.idnumberlist
    ReactDOM.render(
      <div id="root">
          {idnumbers.map(
           idnumber => 
           <div className="idcard-list-skeleton">
              <div className="label-skeleton animated-background"/><br/>
            <div className="label-skeleton animated-background"/>
          </div>
          )}
      </div>
      ,document.getElementById('root'));
  }
  
  render(){
    if(this.state.loading){
      let skeleton = <div id="root">
        <div className="idcard-list-skeleton">
          <div className="label-skeleton animated-background"/><br/>
          <div className="label-skeleton animated-background"/>
        </div>
        <div className="idcard-list-skeleton">
          <div className="label-skeleton animated-background"/><br/>
          <div className="label-skeleton animated-background"/>
        </div>
        <div className="idcard-list-skeleton">
          <div className="label-skeleton animated-background"/><br/>
          <div className="label-skeleton animated-background"/>
        </div>
        <div className="idcard-list-skeleton">
          <div className="label-skeleton animated-background"/><br/>
          <div className="label-skeleton animated-background"/>
        </div>
        <div className="idcard-list-skeleton">
          <div className="label-skeleton animated-background"/><br/>
          <div className="label-skeleton animated-background"/>
        </div>
        <div className="idcard-list-skeleton">
          <div className="label-skeleton animated-background"/><br/>
          <div className="label-skeleton animated-background"/>
        </div>
        <div className="idcard-list-skeleton">
          <div className="label-skeleton animated-background"/><br/>
          <div className="label-skeleton animated-background"/>
        </div>
        <div className="idcard-list-skeleton">
          <div className="label-skeleton animated-background"/><br/>
          <div className="label-skeleton animated-background"/>
        </div>
      </div>;
      return(
        skeleton
      );
    }
    return(
      <div>กำลังเตรียมข้อมูล {this.props.count} รายการ ยกเว้น {this.props.except}</div>
    );
  }

}

export default RandomIDNumberList;
