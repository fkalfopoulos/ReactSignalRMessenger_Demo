import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import GitHub from './GitHub';
 
 

class GitHome extends Component {

  state = {
    items: [],
    isLoading :false
  }

  componentDidMount() {
    this.getItens();
  }

  getItens = () => {
    fetch("https://api.github.com/users/krissanawat")
      .then(res => res.json())
      .then(res => this.setState({ items: res }))
      .catch(err => console.log(err));
  }

   
  render() {
    return <Container style={{ paddingTop: "100px" }}>
      <Row>
        <Col>
          <h3>GitList</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <GitHub
            items={this.state.items}
             />
        </Col>
      </Row>
     
    </Container>;
  }
}

export default GitHome;
