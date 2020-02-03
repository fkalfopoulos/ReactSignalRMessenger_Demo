import React from 'react';
import './ConversationSearch.css';

 const ConversationSearch = (props) => {
    return (
      <div className="conversation-search">
        <input
          type="search" className="conversation-search-input" placeholder="Search Messages" onChange={(e) => props.handleSearch(e)} value={props.value} />
      </div>
    );
}

export default ConversationSearch;