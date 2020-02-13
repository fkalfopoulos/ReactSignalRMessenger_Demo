
import { HubConnectionBuilder }  from '@microsoft/signalr';
 import Message from '../Message';
 import React, { Component, Fragment} from 'react'; 
 import axios from 'axios'; 
 import './Compose.css';
 import '../Message/Message.css'

 
class Compose extends Component {
  constructor() {
    super( );
   
    this.state = {
        messages:[],
        newMessage: '',
        hubConnection: null
    }
}  
  componentDidMount = () => {   
   this.InitConnection();
  }
  
  InitConnection = () =>{
    const connection = new HubConnectionBuilder()
    .withUrl('https://localhost:44321/chatHub')
    .build();

    this.setState({ connection }, () => {
      this.state.connection
        .start()
        .then(() => console.log('Connection started!'))
        .catch(err => console.log('Error while establishing connection :('));     

        this.state.connection.on('ShowSentMessage', (content,id,senderId,receiverId) => {          
             var arr= [];
           arr.push(content)
           this.setState({ messages:arr });
           console.log(this.state.messages);
     })        
   })    
  }

  enterPressed = (event) => {
    var code = event.keyCode || event.which;
    if(code === 13) { this.handleSend();
    } 
  } 
  
  handleSend = (event) => { 
    event.preventDefault();
       const messageViewModel = {
       receiverId: this.props.id,
        content: this.state.newMessage
    }     
    axios.post('https://localhost:44321/api/React/SendMessage', messageViewModel).then((response) => {          
    console.log(response.data);
    const msgViewModel={
      receiverId: response.data.receiverId,
      content: response.data.content,
      senderId : response.data.senderId,
      id: response.data.id
    }
    console.log(msgViewModel);
    this.state.connection
      .invoke("SendMessage", msgViewModel.content, msgViewModel.receiverId, msgViewModel.senderId, msgViewModel.id)
      .catch(err => console.error(err));
  })  
      this.setState({message: ''}) 
}

  handleMessageChange = e => {
  this.setState({newMessage: e.target.value});
  }

  RenderMessages = () =>{
    var i =0;
    let msgs = this.state.messages.map((message,i) =>  
      <Message  key={i} data={message} />   , 
    
    i +=1 )
    return msgs;
  }

  render() {
    return (
      <Fragment> 
      <div className="compose">          
      <form onSubmit={this.handleSend}  >          
                    <input
                       type="text"
                        className="compose-input"
                        placeholder="Type a message, @name"     
                        value={this.state.newMessage}
                        onChange={this.handleMessageChange}     
                        onKeyPress={this.enterPressed.bind(this)}                                          
                     /> 
                    <button type="submit" className="btn btn-warning"  >Send</button>        
                    </form>
                        
     </div> 
     <div className="message-list-container">  { this.state.messages.map((message, index) => (
          <Message key={index} data={message}/>  ))}
          </div>
     </Fragment>
    )
  }
} 
export default Compose;

