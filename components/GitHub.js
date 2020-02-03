import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import Loader from './Loader';
 
 
class GitHub extends Component {

    fetchGitHub = () => {
        fetch('https://api.github.com/users/krissanawat')
          .then((res) => res.json())
          .then((res) => {
            let { login, name, company, blog, location, bio } = res;
            this.setState({
              login: login,
              name: name,
              company: company,
              blog: blog,
              location:location,
              bio: bio,
              loading: false
            });
          })
          .catch((error) => {
            console.log(error);
            this.wait();
          });
      };

   
  render() {
        const items = this.props.items;
        return <Table striped>
          <thead className="thead-dark">
            <tr>
              <th>login</th>
              <th>name</th>
              <th>company</th>           
              <th>blog</th>
               <th>location</th>
                <th>bio</th>
                <th>blog</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!items || items.length <= 0 ?
              <tr>
                <td colSpan="6" align="center"><b>No Users yet@@@@@@@</b></td>
              </tr>
              : items.map(item => (
                <tr key={item.id}>
                  <th scope="row">
                    {item.id}
                  </th>
                  <td>
                    {item.name}
                  </td>
                  <td>
                    {item.email}
                  </td>              
                  <td>
                    {item.phone}
                  </td>
                  <td align="center">                    
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>;
      }
    }
    
    export default GitHub;