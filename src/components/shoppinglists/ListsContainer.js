import React, { Component } from 'react';
import _ from 'lodash';
import toastr from 'toastr';

import instance from '../AxiosInstance';

import { Button, Modal } from 'react-bootstrap';

import AddListForm from './AddListForm';
import UpdateListForm from './UpdateListForm';
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
            searchErrorMessage: ''
        }
    }

    componentDidMount(){
        this.getAllShoppingLists();
    }

    getAllShoppingLists = () => {
        instance.get('/shoppinglists').then(
            response => {
                this.setState({
                    shoppingLists: _.mapKeys(response.data.shoppinglists, 'list_id'),
                    count: response.data.count
                })
            }).catch(error =>{
                    toastr.error(error.response.data.message)
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
        instance.delete(`/shoppinglists/${id}`).then(
            response => {
                this.getAllShoppingLists();
                toastr.success('Shopping list successfully deleted!')
            }).catch(error =>{
                    toastr.error(error.response.data.message)
            })
    }
    deleteAllShoppingLists = () => {
        instance.delete(`/shoppinglists`).then(
            response => {
                this.getAllShoppingLists();
                toastr.success('All shopping lists successfully deleted!')
            }).catch(error =>{
                    toastr.error(error.response.data.message)
            })
    }
    
    render(){
        console.log(this.state.searchErrorMessage)
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
                                getAllShoppingLists={this.getAllShoppingLists}
                                closeModal = {() => this.setState({showModal3:false})}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => this.setState({ showModal3:false})}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                    </div>
                    <div className="col-xs-2">
                        <Button 
                            onClick = {() => this.deleteAllShoppingLists}
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
                    allShoppingLists = {this.state.shoppingLists}
                    updateShoppingList = {this.updateShoppingList}
                    deleteOneShoppingList = {this.deleteOneShoppingList}
                    searchErrorMessage = {this.state.searchErrorMessage}
                />

                <PaginateLists 
                    count = {this.state.count}
                    limit = {this.state.limit}
                    onPaginateLists = {this.onPaginateLists}
                />
            </div>
        );
    }
}
export default ListsContainer;