import React , {Fragment, useState} from 'react';
import './ConversationSearch.css';
import useDataApi from 'use-data-api' ;

 const ConversationSearch = (props) => {
  const [query, setQuery] = useState('');
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    'https://localhost:44321/api/React/LiveUsersSearch?=foivos' ,
    { result: [] },
  );

 
  return ( 
    <Fragment>
      <form
        onSubmit={event => {
          doFetch(
            `https://localhost:44321/api/React/LiveUsersSearch?=${query}`,
          );
          event.preventDefault();
        }}
      >        
      <div className="conversation-search">
        <input
          type="text" className="conversation-search-input" placeholder="Search Messages"  value={query}  onChange={event => (event.target.value)} />
      </div> 
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.result.map(item => (
            <li key={item.id}>
              <a href={item.name}>{item.imageSrc}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}
  

  
 
export default ConversationSearch;