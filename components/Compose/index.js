import React, { Component} from 'react'; 
import './Compose.css';
import { HubConnectionBuilder }  from '@microsoft/signalr';
 import SimpleMessage from '../SimpleMessage';
 import  {sendMessageToApi} from '../Utils/utils';


class Compose extends Component {
    state = {     
      message: '',
      messages: [],
      user:'',
      senderId:'',
      hubConnection: null,
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

      this.state.connection.on('sendToAll', (receivedMessage) => {       
        const text =  `${receivedMessage}`;
             
        this.setState({ text });
      });
    });
  };

   sendMessage =  (message) => {

    const messageViewModel = { 
      Text: message 
  };
  sendMessageToApi(messageViewModel).then(res => {
      if(res.status === 200){
          console.log("Message succesfully been sent");
      }
  }).catch(err => {
      console.log(err.response.data);
  });    
    this.state.connection
      .invoke('SendReact', this.state.message)
      .catch(err => console.error(err));       
      this.setState({message: ''});      
  };

  enterPressed(event) {
    var code = event.keyCode || event.which;
    if(code === 13) { this.sendMessage();
    } 
  }

  render()  
   {
    return (
      <div className="compose">
      <input
        type="text"
        className="compose-input"
        placeholder="Type a message, @name"         
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}  
          onKeyPress={this.enterPressed.bind(this)}
        />
         
    <div className="message-list-container">{this.state.messages.map((message, index) => (        
      <SimpleMessage      
      key={index}                            
     data={message}/>     
    ))
    }    
    </div>
    </div>
  )
    }
  }
  
export default Compose;

