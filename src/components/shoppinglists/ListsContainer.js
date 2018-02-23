import '../../index.css';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

import React, { Component } from 'react';
import _ from 'lodash';
import toastr from 'toastr';

import instance from '../AxiosInstance';

import { Button, Modal } from 'react-bootstrap';

import AddListForm from './AddListForm';
import ViewLists from './ViewLists';
import PaginateLists from './PaginateLists';

class ListsContainer extends Component{
    constructor(props, context) {
        super(props, context);

        this.state = {
            listname:'',
            shoppingLists: [],
            count: 0,
            limit: 5,
            term: '',
            getErrorMessage: '',
            searchErrorMessage: ''
        }
    }

    componentDidMount(){
        this.getAllShoppingLists();
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    addShoppingList = (event) => {
        event.preventDefault();
        let values = new FormData();
        values.set("listname", this.state.listname);

        instance.post('/shoppinglists', values).then(
            response => {
                this.setState({
                    listname:'',
                    showModal3: false
                });
                this.getAllShoppingLists();
                toastr.success("You have successfully created a shopping lists!")
            }
        ).catch(error => {
            toastr.error(error.response.data.message)
        })
    }

    getAllShoppingLists = () => {
        instance.get('/shoppinglists').then(
            response => {
                this.setState({
                    shoppingLists: _.mapKeys(response.data.shoppinglists, 'list_id'),
                    count: response.data.count,
                    getErrorMessage: ''
                })
            }).catch(error =>{
                this.setState({
                    shoppingLists: '',
                    count: '',
                    getErrorMessage: error.response.data.message
                });
                if(this.state.getErrorMessage === 'Sorry your token expired, please log in again!'){
                    localStorage.clear();
                    this.props.history.push('/');
                }
            })
        }
    onPaginateLists = (limit, page) => {
        instance.get(`/shoppinglists?limit=${limit}&page=${page}`).then(
            response => {
                this.setState({
                    shoppingLists: _.mapKeys(response.data.shoppinglists, 'list_id'),
                    count: response.data.count
                })
            }).catch(error =>{
                    toastr.error(error.response.data.message)
            })
    }
    onSearchShoppingList = (term) => {
        instance.get(`/shoppinglists?q=${term}`).then(
            response => {
                this.setState({
                    shoppingLists: _.mapKeys(response.data.shoppinglists, 'list_id'),
                    count: response.data.count,
                    searchErrorMessage: ''
                })
            }).catch(error =>{
                this.setState({
                    shoppingLists: '',
                    searchErrorMessage: error.response.data.message
                })
            })
    }
    deleteOneShoppingList = (id) => {
        confirmAlert({
            title: 'Confirm to DELETE',                       
            message: 'Are you sure you want to DELETE?',                 
            confirmLabel: 'Yes',                           
            cancelLabel: 'No',                             
            onConfirm: () => {
                instance.delete(`/shoppinglists/${id}`).then(
                    response => {
                        this.getAllShoppingLists();
                        toastr.success('Shopping list successfully deleted!')
                    }).catch(error =>{
                            toastr.error(error.response.data.message)
                    })
            },    
            onCancel: () => '',      
        });
        
    }
    deleteAllShoppingLists = () => {
        confirmAlert({
            title: 'Confirm to DELETE',                       
            message: 'Are you sure you want to DELETE?',                 
            confirmLabel: 'Yes',                           
            cancelLabel: 'No',                             
            onConfirm: () => {
                instance.delete(`/shoppinglists`).then(
                    response => {
                        this.getAllShoppingLists();
                        toastr.success('All shopping lists successfully deleted!')
                    }).catch(error =>{
                            toastr.error(error.response.data.message)
                    })
            },    
            onCancel: () => '', 
        });
    }
    
    render(){
        return(
            <div className="ViewContainer">
                <div className="row">
                    <div className="col-xs-2">
                    <Button 
                        onClick={() => this.setState({showModal3:true})}
                        >
                        Add List
                    </Button>
                    <Modal show={this.state.showModal3} onHide={() => this.setState({ showModal3:false})}>
                        <Modal.Header closeButton>
                            <Modal.Title>Shopping List Form</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddListForm
                                listName={this.listname}
                                onChange={this.handleChange}
                                onSubmit={this.addShoppingList}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => this.setState({ showModal3:false})}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                    </div>
                    <div className="col-xs-2">
                        <Button 
                            onClick = {() => this.deleteAllShoppingLists()}
                            type="button"
                            >Delete Lists
                        </Button>
                    </div>
                    <div className="col-xs-8">
                        <input 
                            placeholder= "search lists"
                            value = {this.state.term}
                            onChange={event => this.setState({term: event.target.value}, () => {
                            this.onSearchShoppingList(this.state.term);
                        })} />
                    </div>
                </div>

                <ViewLists 
                    props={this.props}
                    getAllShoppingLists={this.getAllShoppingLists}
                    allShoppingLists={this.state.shoppingLists}
                    updateShoppingList={this.updateShoppingList}
                    deleteOneShoppingList={this.deleteOneShoppingList}
                    getErrorMessage={this.state.getErrorMessage}
                    searchErrorMessage={this.state.searchErrorMessage}
                />

                <PaginateLists 
                    count={this.state.count}
                    limit={this.state.limit}
                    onPaginateLists={this.onPaginateLists}
                />
            </div>
        );
    }
}
export default ListsContainer;