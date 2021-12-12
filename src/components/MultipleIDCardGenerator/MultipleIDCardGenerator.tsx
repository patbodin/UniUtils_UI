import React from 'react';
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

class MultipleIDCardGenerator extends React.Component<{request:string},{loading:boolean}>{
  constructor(props:any){
    super(props);
    this.state = {
      loading:true
    }
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
  getData(): Promise<IRandomIDHeader>{
    
    //Pre-Render full screen
    let url = 'http://10.138.46.91:5099/api/idnumbers/v1/lastdigit';
    
    return fetch(url)
      .then(res => res.json())
      .then(res => {
        this.loadingAndShow(res)
        return res as IRandomIDHeader;
      })
  }



  render(){
    if(this.state.loading){
      <div id="root">
           <div className="idcard-list-skeleton">
              <div className="label-skeleton animated-background"/><br/>
            <div className="label-skeleton animated-background"/>
          </div>
      </div>
    }
    return(
      <div id="root">Loading...</div>
    );
  }
}

export default MultipleIDCardGenerator;
