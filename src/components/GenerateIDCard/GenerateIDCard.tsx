import React from 'react';

class GenerateIDCard extends React.Component<{},{loading:boolean}>{

  constructor(props:any){
    super(props);
    this.state = {
      loading : true
    }
  }

  render() {
    
      return(
        <div id="container">

        </div>
      );
  }
}

export default GenerateIDCard;
