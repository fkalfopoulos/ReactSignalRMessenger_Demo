
import { HubConnectionBuilder }  from '@microsoft/signalr';
 import React, { Component, Fragment} from 'react'; 
 import axios from 'axios'; 
 import './Compose.css';
 import '../Message/Message.css' 
 const MY_USER_ID = 'admin';

 
class Compose extends Component {
  constructor(props) {
    super(props );
   
    this.state = {        
        newMessage: '',
        messages: [],
        hubConnection: null
    }
}  
  componentDidMount = () => {   
   this.InitConnection();
  }
  getId = () => {
    return localStorage.getItem('userId');
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

        this.state.connection.on('ShowSentMessage', (content,senderId,id,receiverId,senderName) => {  
       const message =     {
          content : content,
          id : receiverId,   
          author:senderName ,
          senderId : senderId           
          }    
         this.props.addMessageToState(message);
     })        
   })    
  }

  enterPressed = (event) => {
    event.preventDefault();
    var code = event.keyCode || event.which;
    if(code === 13) { this.handleSend();
    } 
  } 
  
  handleSend = (event) => { 
         event.preventDefault();
        const messageViewModel = 
        {
        receiverId: this.props.id,
        content: this.state.newMessage,
        senderId: this.getId()
        }     
    axios.post('https://localhost:44321/api/React/SendMessage', messageViewModel).then((response) => {          
     
    const msgViewModel={
      receiverId: response.data.receiverId,
      message: response.data.content,
      senderId : response.data.senderId,
      id: response.data.id,
      senderName : response.data.senderName,
      
    }
     
      

    this.state.connection.invoke('RegisterUser', this.getId()).catch(err => console.error(err));
      this.state.connection.invoke("SendMessage", msgViewModel.message, msgViewModel.receiverId,  msgViewModel.id, msgViewModel.senderId, msgViewModel.senderName)
      .catch(err => console.error(err));
      this.setState({newMessage: ''});  

      this.state.connection.on("ReceiveMessage", (content , receiverId , MessageID , senderId, senderName) => {  
      const message =     {
        content : content,
        id : receiverId,   
        author:senderName ,
        senderId : senderId       
        }    
        console.log(message);
        console.log('here');
       this.props.addMessageToState(message);
   })        
  })    
} 
  handleMessageChange = e => {
  this.setState({newMessage: e.target.value});
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
                     /> 
                    <button type="submit" className="btn btn-warning" >Send</button>        
                    </form>                         
     </div>           
     </Fragment>
    )
  }
}
 
export default Compose;

