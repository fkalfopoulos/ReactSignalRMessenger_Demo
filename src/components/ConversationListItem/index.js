import React, {useEffect} from 'react';
import shave from 'shave';
import './ConversationListItem.css';
 

export default function ConversationListItem(props) {
  useEffect(() => {
    shave('.conversation-snippet', 30);
  })
 
    const { photo, name, text, id } = props.data; 
    return (
      <div className="conversation-list-item" id={props.id} onClick={props.setCurrentConvId} >
        <img className="conversation-photo" src={photo} alt=""  />
        <div className="conversation-info" >
          <h1 className="conversation-title">{name}</h1>
          <p className="conversation-snippet">{ text }</p>      
        </div>
      </div>
    );
}