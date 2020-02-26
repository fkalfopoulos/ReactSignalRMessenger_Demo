
import React, {useEffect, useState, Fragment} from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';
import axios from 'axios';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import './MessageList.css';
import '../ConversationList/ConversationList.css'
const MY_USER_ID = 'admin';

class  MessageList extends React.Component {
  constructor(props) {
    super(props ); 
  this.state = {
  message:'',
  messages:[],
  conversation:'',
  conversations:[],
  query:'' 
}     
  }
     componentDidMount = () => {               
     this.FetchMessages(this.state.query);
    }      

    getUsername = () => {
      return localStorage.getItem('username');
  }

  getId = () => {
    return localStorage.getItem('userId');
  }
    componentDidUpdate(prevProps, prevState) {       
      if (prevState.query !== this.state.query) {
        this.FetchMessages(this.state.query)    }       
    }        
   componentDidMount = () => {            
    this.getConversations();
  }   
   ClearState = () => {
    this.setState({messages:[]});   }    
    
    ClearSearch = () => {
   this.setState({conversations:[]});
  }

  setCurrentConvId = e => {
    this.setState({query:e.currentTarget.id}); console.log(this.state.query); 
    }; 

    addMessageToState = message => {       
      this.setState(previous => ({
        messages: [...previous.messages, message]
      }));
      console.log(this.state.messages);
    }
    
    FetchMessages = () => { 
    this.ClearState();        
    let userId ={ userId : this.getId()
    } 
    console.log(userId);
    axios.post(`https://localhost:44321/api/React/GetChat?=${this.state.query}`, userId).then((response) => {
      let tempMessage =  response.data.map(data => {
        return {
          id: data.id,
          author: data.sender.name,      
          receiver:data.receiver.name,
          content: `${data.messageText}`,
          timestamp: data.dateSent      
        }
      });      
        this.setState({messages: tempMessage});         
  }); 
}

        getConversations = () => {         
        axios.post(`https://localhost:44321/api/React/RenderMessages?=${this.getId()}`).then(response => { 
            let newConversations = response.data.result.map(result => {
              return {
                photo: result.imageSrc,
                name: `${result.name}`,
                text: `${result.text}`,
                id: `${result.id}`            
              }
            }); 
            this.setState({conversations: newConversations}) 
        });
      }  
      
   renderMessages = () => {
    let i = 0;
    let messageCount =  this.state.messages.length;
    let tempMessages = [];
   
   
    while (i < messageCount) {
      let previous = this.state.messages[i - 1];
      let current = this.state.messages[i];
      let next = this.state.messages[i + 1];
      let isMine = current.author === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;      

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;
        
        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }
      
      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
          id={current.id}
        />
      );
      // Proceed to the next message.
      i += 1;
    }       
    return tempMessages;
  }    
      render()  
      {  
      
      return (
        <Fragment> 
        <div className="scrollable sidebar">        
          <div className="conversation-list">
          <Toolbar
            title="Messenger"
            leftItems={[
              <ToolbarButton key="cog" icon="ion-ios-cog" />
            ]}
            rightItems={[
              <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
            ]}
          />
          <ConversationSearch ClearSearch={this.ClearSearch} setCurrentConvId={this.setCurrentConvId} FetchData={this.FetchData} />
          {
            this.state.conversations.map(conversation =>
              <ConversationListItem
                key={conversation.id}
                data={conversation}  
                id={conversation.id}
                setCurrentConvId={this.setCurrentConvId}                                              
               />
            )        
          }      
        </div>
  </div> 
        <div className="message-list">
          <Toolbar
            title="Conversation Title"
            rightItems={[
              <ToolbarButton key="info" icon="ion-ios-information-circle-outline"   />,
              <ToolbarButton key="video" icon="ion-ios-videocam" />,
              <ToolbarButton key="phone" icon="ion-ios-call" />,
              <ToolbarButton key="photo" icon="ion-ios-camera" />,
              <ToolbarButton key="image" icon="ion-ios-image" />
            ]}
          />
          
          <div className="message-list-container"> <h3>{this.props.userId}</h3>  
            {this.renderMessages()}</div>
          
          <Compose setCurrentConvId={this.setCurrentConvId}  id={this.state.query} renderMessages={this.renderMessages} addMessageToState={this.addMessageToState} 
           rightItems={[
            <ToolbarButton key="photo" icon="ion-ios-camera" />,
            <ToolbarButton key="image" icon="ion-ios-image" />,            
            <ToolbarButton key="emoji" icon="ion-ios-happy" />
          ]}/>
        
        </div>
          
        </Fragment>
      )
      }
    } 
      export default MessageList;