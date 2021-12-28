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
  lastdigit:string;
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
               <label className="idnumber-subline">{idnumber.formattedidnumber}</label><br/>
               <label className="idnumber-subline">{idnumber.lastdigit}</label>
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
  getData(){
    
    //Pre-Render full screen
    let url = 'http://10.138.46.91:5099/api/idnumbers/v1/lastdigitlist';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Accept': 'application/json','Cache-Control':'no-cache','Connection':'keep-alive'},
      body: this.props.request
    };
    fetch(url, requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            //this.renderResult(data as ILogin)
            this.renderData(data as IRandomIDHeader);

        })
        .catch(error => {
            alert(error.message);
        });
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
