import React from 'react';
import moment from 'moment';
import './Message.css';

export default function Message(props) {
    const {
      data,
      isMine,
      from,
      id,
      startsSequence,
      endsSequence,
      showTimestamp,
    } = props;

    const friendlyTimestamp = moment(data.timestamp).format('LLLL');
    
    return (
      <div className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`
      ].join(' ')}>
        {
          showTimestamp &&
            <div className="timestamp">
              { friendlyTimestamp }
            </div>
        }

        <div className="bubble-container">
          <div className="bubble" title={id} >
            { data.content } 
          </div>
          <span className="check" id="check" style={{display:'none'}} value={id}><input type="checkbox" /></span>
        </div>
      </div>
    );
}