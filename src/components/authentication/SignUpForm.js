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

class SignUpForm extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.state = {
        username: '',
        email: '',
        password: '',
        repeat_password: ''
      };

      this.handleChange = this.handleChange.bind(this);
    }

    getValidationState = () => {
      const length = this.state.password.length;
      if (length > 6) return 'success';
      else if (length > 3) return 'warning';
      else if (length > 0) return 'error';
      return null;
    }
  
    handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let values = new FormData();
        values.set("username", this.state.username);
        values.set("email", this.state.email);
        values.set("password", this.state.password);
        values.set("repeat_password", this.state.repeat_password);

        axios.post('/auth/register', values).then(
            response => {
                this.props.closeModal();
                toastr.success("You have successfully registered!")
            }
        ).catch(error => {
            console.log(error.response)
            toastr.error(error.response.data.message)
        })
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
            <FormGroup
                controlId="text"
                // validationState={this.getValidationState()}
                >
                <ControlLabel>Username</ControlLabel>
                    <FormControl
                        type="text"
                        name="username"
                        value={this.state.username}
                        placeholder="Enter username"
                        onChange={this.handleChange}
                    />
            </FormGroup>
            <FormGroup
                controlId="email"
                // validationState={this.getValidationState()}
                >
                <ControlLabel>Email</ControlLabel>
                    <FormControl
                        type="email"
                        name="email"
                        value={this.state.email}
                        placeholder="Enter email"
                        onChange={this.handleChange}
                    />
            </FormGroup>
            <FormGroup
                controlId="password"
                validationState={this.getValidationState()}
                >
                <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
            </FormGroup>
            <FormGroup
                controlId="repeat_password"
                validationState={this.getValidationState()}
                >
                <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        type="password"
                        name="repeat_password"
                        value={this.state.repeat_password}
                        onChange={this.handleChange}
                    />
            </FormGroup>
            <Button type="submit">Submit</Button>
            <FormControl.Feedback />
      </form>
      );
    }
  }
  
export default SignUpForm;