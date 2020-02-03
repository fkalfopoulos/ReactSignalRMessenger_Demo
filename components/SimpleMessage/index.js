import React from 'react';
import './SimpleMessage.css';

export default function Message(props) {
    const {
      data,
      isMine      
    } = props;   
    
    return (
      <div className={[
        'message',
        `${isMine ? 'mine' : ''}`        
      ]}>        

        <div className="bubble-container">
          <div className="bubble" >
            { data.message } 
          </div>
        </div>
      </div>
    );
}