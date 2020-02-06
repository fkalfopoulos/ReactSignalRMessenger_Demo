import React, { Component} from 'react'; 
import './Compose.css';
import { HubConnectionBuilder }  from '@microsoft/signalr';
 import Message from '../Message';
 
class Compose extends Component {
  constructor() {
    super();

    this.state = {
        messages:[],
        newMessage: '',
        hubConnection: null
    }
} 

  componentDidMount = () => {   
    const connection = new HubConnectionBuilder()
    .withUrl('https://localhost:44321/chatHub')
    .build();

    this.setState({ connection }, () => {
      this.state.connection
        .start()
        .then(() => console.log('Connection started!'))
        .catch(err => console.log('Error while establishing connection :('));      
    });
  };
 
  handleSend = () => {
    this.props.onSend(this.state.newMessage);
    this.setState({newMessage: ''});
}

handleMessageChange = e => {
  this.setState({newMessage: e.target.value});
}
  enterPressed(event) {
    var code = event.keyCode || event.which;
    if(code === 13) { this.sendMessage();
    } 
  } 
  renderMessages = () => {
    return this.state.messages.map(message => 
         <Message key={message.id} from={message.from} content={message.content}   />
    )
}
  render()  
   {
    return (
      <div className="compose">
         {this.renderMessages()}
        <form onSubmit={this.handleSend}>
                    <input
                       type="text"
                        className="compose-input"
                        placeholder="Type a message, @name"     
                        value={this.state.newMessage}
                        onChange={this.handleMessageChange}                         
                       onKeyPress={this.enterPressed.bind(this)}/>
                    <button type="submit" className="btn btn-warning">Send</button>
                </form> 
         />
         
    <div className="message-list-container">{this.state.messages.map((message, index) => (        
     <Message
     key={index}       
     data={message}
   />
 )     )}
    </div> 
    </div>
  )
    }
  }
  
export default Compose;

