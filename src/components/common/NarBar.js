import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button  } from 'react-bootstrap';

export default class NavBar extends Component {

    logout = () => {
        const access_token = localStorage.getItem('access_token');
        if(!access_token){
            return(
                <div></div>
            );
        }
        else{
            return(
                <div>
                    <Link 
                        bsStyle="primary" 
                        bsSize="large" 
                        onClick={() => localStorage.clear()}
                        to='/'
                        >
                        Logout
                    </Link>
                </div>
            );
        }
    }
    render(){
        console.log('ddddddd', this.props)
        return(
            <div>
                  <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                          <h1>Shopping List Tracker</h1>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                  <Navbar.Collapse>
                      <Nav pullRight>
                        <Navbar.Brand>
                            {this.logout()}
                        </Navbar.Brand>
                      </Nav>
                  </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}
