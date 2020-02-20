import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import {withRouter} from 'react-router-dom';
import axios from 'axios';


class Login extends React.Component {
    state = { 
        email: '',
        password:''
    }

    componentDidMount() {
        if (this.props.user) {
            const {  email, password } = this.props.user
            this.setState({ email,password});
        }
    }

      handleUserChange = e => {
        this.setState({email: e.target.value});
        }

        handlePasswordChange = e => {
            this.setState({password : e.target.value});
        } 

    submitNew = e => {
        e.preventDefault();
        localStorage.setItem('username', this.state.username);        
        var LoginViewModel = {
            email:this.state.email,
            password: this.state.password
        }      
       axios.post('https://localhost:44321/api/React/Validate', LoginViewModel).then((response) => 
       {
           console.log(response);        
            this.props.history.push('/Messenger');
        })
     
}

    render() 
    {
        return <Form onSubmit={this.submitNew}>
            
            <FormGroup>
                <Label for="email">Email:</Label>
                <Input type="email" name="email" onChange={this.handleUserChange} value={this.state.email} />
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