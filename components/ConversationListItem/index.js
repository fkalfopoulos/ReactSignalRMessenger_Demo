import React, {useEffect} from 'react';
import shave from 'shave';
import './ConversationListItem.css';
 

export default function ConversationListItem(props) {
  useEffect(() => {
    shave('.conversation-snippet', 30);
  })
 
    const { photo, name, text, id } = props.data;    
    
    console.log(props.data.id);

    return (
      <div className="conversation-list-item">
        <img className="conversation-photo" src={photo} alt="conversation"  />
        <div className="conversation-info">
          <h1 className="conversation-title">{ name }{id}</h1>
          <p className="conversation-snippet">{ text }</p>      
        </div>
      </div>
    );
}