import React , {Fragment, useState, useEffect} from 'react';
import './ConversationSearch.css';
import axios from'axios';
import ConversationListItem from '../ConversationListItem';
const Api_URl = 'https://localhost:44321/api/react/LiveUsersSearch';

 const ConversationSearch = (props) => {
  const [searchString, setSearchString] = useState('');
  const [searchResults, setSearchResult] = useState([]);
  const setCurrentSearch = e => { setSearchString(e.currentTarget.id); console.log(e.currentTarget.id);  }; 
  const [loading, setLoading] = useState(true);   ;
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    FetchData()
  });

  const FetchData = (event) =>
  { 
    event.preventDefault();
      axios.post(`https://localhost:44321/api/React/LiveUsersSearch?=${searchString}`).then((response) => {  
        console.log(response);
      let result =  response.data.map(data => { 
        return {
          photo: data.imageSrc,
          name: `${data.name}`,          
          id: `${data.id}`
        }
      })
     setSearchResult(result);   
      event.preventDefault();
      })
    }

  const HandleSearchInput = (e) => {
    setSearchString(e.target.value);
  }

  const ResetString=() => {
    setSearchString('');
  }  

  const RenderResult = () => {
    return searchResults.map(searchResult =>
      <ConversationListItem
        key={searchResult.id}
        data={searchResult}  
        id={searchResult.id}
                                                   
       />)
  }

const searchHandler = (e) => {
  e.preventDefault();
  props.search(searchString);
  ResetString();
}

  const enterPressed = (event) => {
    var code = event.keyCode || event.which;
    if(code === 13) { FetchData();
    } 
  }
 
  return ( 
    <Fragment>
      <form
        onSubmit= {FetchData} >        
      <div className="conversation-search">
        <input
          type="text" className="conversation-search-input" placeholder="Search Messages"  value={searchString}  onChange={HandleSearchInput}   />
      </div> 
        <button type="submit">Search</button>
      </form>   <div className="conversation-list"> {console.log(searchResults.map(searchResult =>
      <ConversationListItem
        key={searchResult.id}
        data={searchResult}  
        id={searchResult.id}
                                                   
       />))
      }
      </div>

       
    </Fragment>
  );
  }
 
export default ConversationSearch;