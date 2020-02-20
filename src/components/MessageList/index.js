
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

export default function MessageList(props) {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [query,setConvId] = useState(null);    
  const setCurrentConvId = e => { setConvId(e.currentTarget.id); console.log(e.currentTarget.id);  }; 
   
  
  useEffect(() => {              
    FetchData(query)}, [query],
        
    );

   useEffect(() => {          
    getConversations();
  },[]);  
  

  const ClearState = () => {
    setMessages([])
}
const ClearSearch = () => {
  setConversations([])
}

   const FetchData = () => { 
    ClearState();   
    
    axios.post(`https://localhost:44321/api/React/GetChat?=${query}`).then((response) => {
      let tempMessage =  response.data.map(data => {
        return {
          id: data.id,
          author: data.sender.name,      
          receiver:data.receiver.name,
          content: `${data.messageText}`,
          timestamp: data.dateSent      
        }
      });      
        setMessages(tempMessage);         
  });
  }  
  
      const getConversations = () => {         
        axios.post('https://localhost:44321/api/React/RenderMessages').then(response => { 
            let newConversations = response.data.result.map(result => {
              return {
                photo: result.imageSrc,
                name: `${result.name}`,
                text: `${result.text}`,
                id: `${result.id}`            
              }
            }); 
            setConversations(newConversations) 
        });
      }  
      
  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];
   

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
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
    return( 
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
        <ConversationSearch ClearSearch={ClearSearch} setCurrentConvId={setCurrentConvId} FetchData={FetchData} />
        {
          conversations.map(conversation =>
            <ConversationListItem
              key={conversation.id}
              data={conversation}  
              id={conversation.id}
              setCurrentConvId={setCurrentConvId}                                              
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
        
        <div className="message-list-container">{renderMessages()}</div>
        
        <Compose setCurrentConvId={setCurrentConvId}  id={query} renderMessages={renderMessages} setMessages={setMessages}  rightItems={[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          
          <ToolbarButton key="emoji" icon="ion-ios-happy" />
        ]}/>
      
      </div>
        
      </Fragment>
    );
      }