import React from 'react';
import './SimpleMessage.css';

const SimpleMessage = ({data}) => {
 

    return (
      <div className={[
        'message',
        `${data.isMine ? 'mine' : ''}`        
      ]}>        

        <div className="bubble-container">
          <div className="bubble" id={data.id}  >
            {data.content} 
          </div>
        </div>
      </div>
    );
}

export default SimpleMessage;