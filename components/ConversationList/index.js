
import React, {useState, useEffect} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import axios from 'axios';
 

export default function ConversationList(props) {

  const [conversations, setConversations] = useState([]);
  const [id,setConvId] = useState('');  
 console.log(conversations);
  useEffect(() => {             
    getConversations();
  }, [])

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
        setConversations([...conversations, ...newConversations]) 
    });
  }  
 
    return (
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
        <ConversationSearch />
        {
          conversations.map(conversation =>
            <ConversationListItem
              key={conversation.id}
              data={conversation}  
              id= {props.data.id}               
              onClick={ () => setConvId(props.data.id)}    
             />
          )        
         }               
      </div>
 
    );
}


