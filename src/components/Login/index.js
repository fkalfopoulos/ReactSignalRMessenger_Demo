import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import MessageList from '../MessageList';
 


class Login extends React.Component {
    constructor () {
        super();
    this.state = { 
        email: '',
        password:'',
        userId:''
    }     
}

    componentDidMount() {
        if (this.props.user) {
            const {  email, password , userId} = this.props.user
            this.setState({ email,password, userId});
            console.log(this.props.user);
        }
    }
      handleUserChange = e => {
        this.setState({email: e.target.value});
        }
        handlePasswordChange = e => {
            this.setState({password : e.target.value});
        } 

        getId = () =>
        { return localStorage.getItem('userId'); }

    submitNew = e => {
        e.preventDefault();
        localStorage.setItem('email', this.state.email);        
        var LoginViewModel = {
            email:this.state.email,
            password: this.state.password
        }      
       axios.post('https://localhost:44321/api/React/Validate', LoginViewModel).then((response) => 
       {
           console.log(response);     
        
           localStorage.setItem('userId', response.data.activeUser.id)            
            this.props.history.push('/Messenger');
        })     
}

    render() 
    {
        const {email} = this.state;
        const localuserId = localStorage.getItem('userId');
         
      this.state.userId =  this.getId();
     
      console.log(this.state.userId);
        return <Form onSubmit={this.submitNew}>
            
            <FormGroup>
                <Label for="email">Email:</Label>
                <Input type="email" name="email" onChange={this.handleUserChange} value={email} />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password:</Label>
                <Input type="text" name="password" onChange={this.handlePasswordChange} value={this.state.password} />
            </FormGroup>
            <Button>Send</Button>
        </Form>;
    }
}
export default withRouter(Login);