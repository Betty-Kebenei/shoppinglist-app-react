import '../../index.css';

import React, { Component } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import { Button, Modal } from 'react-bootstrap';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

class WelcomePage extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        username: '',
        email: '',
        password: '',
        repeat_password: '',
        show: false
      };
    }
    // Handle form input changes.
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // Handle user registration data.
    handleSubmitRegistrationData = (event) => {
        event.preventDefault();
        let values = new FormData();
        values.set("username", this.state.username);
        values.set("email", this.state.email);
        values.set("password", this.state.password);
        values.set("repeat_password", this.state.repeat_password);

        axios.post('/auth/register', values).then(
            response => {
                this.setState({showModal2:false})
                toastr.success("You have successfully registered!")
            }
        ).catch(error => {
            toastr.error(error.response.data.message)
        })
    }

    // Handle user login data.
    handleSubmitLoginData = (event) => {
        event.preventDefault();
        let values = new FormData();
        values.set("email", this.state.email);
        values.set("password", this.state.password);

        axios.post('/auth/login', values).then(
            response => {
                localStorage.setItem('access_token', response.data.access_token);
                this.props.history.push('/shoppinglists')
                toastr.success("You have successfully logged in!")
            }
        ).catch(error => {
            toastr.error(error.response.data.message)
        })
    }
  
    render() {
      return (
        <div className="App">
            <div>
                <h1>Welcome to Shopping List Tracker</h1>
                <h3>Available Features:</h3>
                <p>Create an account.</p>
                <p>Create, read, update and delete shopping lists.</p>
                <p>Create, read, update and delete shopping items in shopping lists.</p>
            </div>
            <Button 
                onClick={() => this.setState({showModal1:true, showModal2:false})}
                >
                Sign In
            </Button>
    
            <Modal show={this.state.showModal1} onHide={() => this.setState({ showModal1:false})}>
                <Modal.Header closeButton>
                <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SignInForm 
                        props={this.props}
                        email={this.state.email}
                        password={this.state.password}
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmitLoginData}
                    />
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={() => this.setState({ showModal1:false})}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Button  
                onClick={() => this.setState({showModal1:false, showModal2:true})}
                >
                Sign Up
            </Button>

            <Modal show={this.state.showModal2} onHide={() => this.setState({ showModal2:false})}>
                <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SignUpForm 
                        username={this.state.username}
                        email={this.state.email}
                        password={this.state.password}
                        repeat_password={this.state.repeat_password}
                        handleChange={this.handleChange}
                        onSubmit={this.handleSubmitRegistrationData}
                        closeModal ={() => this.setState({showModal2:false})}
                    />
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={() => this.setState({showModal2:false})}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
      );
    }
  }
export default WelcomePage;