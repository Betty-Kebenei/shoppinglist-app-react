import '../../App.css';

import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

class WelcomePage extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        show: false
      };
      console.log(props)
    }
  
    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
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
                bsStyle="primary" 
                bsSize="large" 
                onClick={() => this.setState({showModal1:true, showModal2:false})}
                >
                Sign In
            </Button>
    
            <Modal show={this.state.showModal1} onHide={() => this.setState({ showModal1:false})}>
                <Modal.Header closeButton>
                <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SignInForm props={this.props}/>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={() => this.setState({ showModal1:false})}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Button 
                bsStyle="primary" 
                bsSize="large" 
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
                        closeModal = {() => this.setState({showModal2:false})}
                    />
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={() => this.setState({ showModal2:false})}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
      );
    }
  }
export default WelcomePage;