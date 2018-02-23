import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export default class NavBar extends Component {

    // Change what is displayed in the navbar; 
    // Logout link should only be displayed if a user is logged in.
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
