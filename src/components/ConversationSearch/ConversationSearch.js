 
import React , {Fragment} from 'react';
import './ConversationSearch.css';
import axios from'axios';
import ConversationListItem from '../ConversationListItem';
const Api_URl = 'https://localhost:44321/api/react/LiveUsersSearch';
const avatar = 'https://localhost:44321/content/avatar.png';
 

class ConversationSearch extends React.Component {
  constructor(props) {
   super(props ); 
  this.state = {
  searchString:'',
  searchResults:[]   
}     
  }
     componentDidMount = () => {               
     this.FetchSearchData(this.state.searchString);
    }      

    componentDidUpdate(prevProps, prevState) {       
      if (prevState.searchString !== this.state.searchString) {
        this.FetchSearchData(this.state.searchString)    }       
    }        
 
    FetchSearchData = () =>
    {           
       this.props.ClearSearch();
       let SearchModel = { id : this.Getuser() }

        axios.post(`https://localhost:44321/api/React/LiveUsersSearch?=${this.state.searchString}`, SearchModel).then((response) => {  
          
        let temp =  response.data.result.map(result => {           
          return  { 
            photo: `${avatar}`,               
            name: `${result.name}`,          
            id: `${result.id}`             
          }       
        })
        
       this.setState({searchResults:temp});   
       
      
        });
      }
   
   Getuser = () => 
   {  return localStorage.getItem('userId');  } 

    HandleSearchInput = e => { this.setState({searchString: e.target.value});
  }

    render()
{
  return ( 
    <Fragment>
      <form >        
      <div className="conversation-search">
        <input
          type="text" className="conversation-search-input" placeholder="Search Messages"  value={this.state.searchString}  onChange={this.HandleSearchInput}   />
      </div>         
      </form>   
      <div className="conversation-list">  {this.state.searchResults.map(searchResult => 
      <ConversationListItem
        key={searchResult.id}
        data={searchResult}  
        id={searchResult.id}
        photo= {searchResult.photo}
        setCurrentConvId={this.props.setCurrentConvId}                                              
       />)
      }
      </div>
    </Fragment>
  );
  }

}
export default ConversationSearch;


