import React, { Component } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import { 
    FormGroup, 
    ControlLabel,
    FormControl,
    HelpBlock,
    Button 
} from 'react-bootstrap';

class SignInForm extends Component {
    constructor(props) {
      super(props);
  
      this.handleChange = this.handleChange.bind(this);
  
      this.state = {
        email: '',
        password: ''
      };
      console.log(props)
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let values = new FormData();
        values.set("email", this.state.email);
        values.set("password", this.state.password);

        axios.post('/auth/login', values).then(
            response => {
                localStorage.setItem('access_token', response.data.access_token);
                this.props.props.history.push('/shoppinglists')
                toastr.success("You have successfully logged in!")
            }
        ).catch(error => {
            toastr.error(error.response.data.message)
        })
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
            <FormGroup
                controlId="email"
                >
                <ControlLabel>Email</ControlLabel>
                    <FormControl
                        type="email"
                        name="email"
                        value={this.state.email}
                        placeholder="Enter email"
                        onChange={this.handleChange}
                        required
                    />
            </FormGroup>
            <FormGroup
                controlId="password"
                >
                <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />
            </FormGroup>
            <Button type="submit">Submit</Button>
            <FormControl.Feedback />
      </form>
      );
    }
  }
  
export default SignInForm;