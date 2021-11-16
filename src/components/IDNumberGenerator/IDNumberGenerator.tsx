import React from 'react';
import ReactDOM from 'react-dom'

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
class IDNumberGenerator extends React.Component<{request:string},{loading:boolean}>{

  constructor(props:any){
    super(props);
    this.state={
      loading:true
    }
  }

  async loadingAndShow(res:IIDCardNumber){
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
  getData(): Promise<IIDCardNumber>{
    
    let url = 'http://10.138.46.91:5099/api/idnumbers/v1/idnumbergenerator/'+this.props.request;
    return fetch(url)
      .then(res => res.json())
      .then(res => {
        this.loadingAndShow(res);
        return res as IIDCardNumber;
      })
  }
  renderData(res:IIDCardNumber){
      ReactDOM.render(
        <div id="root">
             <div className="idcard-list">
               <label className="idnumber-main">เลขบัตรประชาชน {res.idnumber}</label><br/>
               <label className="idnumber-subline">{res.formattedidnumber}</label>
              </div>
        </div>
        ,document.getElementById('root'));
  }
  renderSkeleton(res:IIDCardNumber){
    ReactDOM.render(
      <div id="root">
           <div className="idcard-list-skeleton">
              <div className="label-skeleton animated-background"/><br/>
            <div className="label-skeleton animated-background"/>
          </div>
      </div>
      ,document.getElementById('root'));
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



export default IDNumberGenerator;
