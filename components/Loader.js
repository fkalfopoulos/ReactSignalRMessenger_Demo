import React from 'react';

export default class Loader extends React.Component{
    constructor(props){
    super(props);
    this.state = {stylePath: 'https://use.fontawesome.com/releases/v5.7.1/css/all.css'};
}
render(){
    return (
    <div className="loader center">
      <i className="fa fa-cog fa-spin" />
    </div>
  );
}
}
 