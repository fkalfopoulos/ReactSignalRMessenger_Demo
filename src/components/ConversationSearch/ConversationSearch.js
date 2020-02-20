 
import React , {Fragment, useState, useEffect} from 'react';
import './ConversationSearch.css';
import axios from'axios';
import ConversationListItem from '../ConversationListItem';
const Api_URl = 'https://localhost:44321/api/react/LiveUsersSearch';
const avatar = 'https://localhost:44321/content/avatar.png';


 const ConversationSearch = ({ClearSearch, setCurrentConvId}) => {
  const [searchString, setSearchString] = useState('');
  const [searchResults, setSearchResult] = useState([]);
   
  const [loading, setLoading] = useState(true);   ;
  const [errorMessage, setErrorMessage] = useState(null);  

  useEffect(() => {
    FetchSearchData(searchString)}, [searchString]);
  
    const FetchSearchData = () =>
    {           
       ClearSearch();
        axios.post(`https://localhost:44321/api/React/LiveUsersSearch?=${searchString}`).then((response) => {  
          console.log(response.data);  
        let temp =  response.data.result.map(result => {           
          return  { 
            photo: `${avatar}`,               
            name: `${result.name}`,          
            id: `${result.id}`             
          }       
        })
        console.log(temp);
       setSearchResult(temp);     
       if(searchString === null)  {
        initialState();
      }; 
    } 
        )}


const initialState = () => {
  try{
    axios.post('https://localhost:44321/api/React/RenderMessages').then(response => { 
      let newConversations = response.data.result.map(result => {
        return {
          photo: result.imageSrc,
          name: `${result.name}`,         
          id: `${result.id}`            
        }});
        setSearchResult(newConversations);
        console.log('ihamafmafma');
      }); 
    }
      catch(e) {
          console.log(e);
      }
  }  
 

  const HandleSearchInput = (e) => {
    setSearchString(e.target.value)}
   
  
  const ResetString=() => {
    setSearchString('');
  }   
  const ResetResult =() => {
    setSearchResult([]);
  }
 
  return ( 
    <Fragment>
      <form >        
      <div className="conversation-search">
        <input
          type="text" className="conversation-search-input" placeholder="Search Messages"  value={searchString}  onChange={HandleSearchInput}   />
      </div>         
      </form>   
      <div className="conversation-list">  {searchResults.map(searchResult => 
      <ConversationListItem
        key={searchResult.id}
        data={searchResult}  
        id={searchResult.id}
        photo= {searchResult.photo}
        setCurrentConvId={setCurrentConvId}                                              
       />)
      }
      </div>
    </Fragment>
  );
  }
 
export default ConversationSearch;


