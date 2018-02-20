import '../../index.css';

import React, { Component } from 'react';
import _ from 'lodash';
import toastr from 'toastr';

import instance from '../AxiosInstance';

import { Button, Modal } from 'react-bootstrap';

import AddItemForm from './AddItemForm';
import ViewItems from './ViewItems';
import PaginateItems from './PaginateItems';

class ItemsContainer extends Component{
    constructor(props, context) {
        super(props, context);

        this.state = {
            listname:'',
            itemname: '',
            quantity:'',
            units:'',
            price:'',
            currency:'',
            allShoppingItems: [],
            count: 0,
            limit: 5,
            getErrorMessage: '',
            searchErrorMessage: ''
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        this.getAllShoppingItems(id);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    addShoppingItem = (event) => {
        event.preventDefault();
        let values = new FormData();
        values.set("itemname", this.state.itemname);
        values.set("quantity", this.state.quantity);
        values.set("units", this.state.units);
        values.set("price", this.state.price);
        values.set("currency", this.state.currency);

        const { id } = this.props.match.params;
        instance.post(`/shoppinglists/${id}/shoppingitems`, values).then(
            response => {
                this.setState({
                    itemname: '',
                    quantity:'',
                    units:'',
                    price:'',
                    currency:'',
                    showModal5: false
                });
                this.getAllShoppingItems(id);
                toastr.success("You have successfully created a shopping item!");
            }
        ).catch(error => {
            toastr.error(error.response.data.message)
        })
    }


    getAllShoppingItems = (id) => {
        instance.get(`/shoppinglists/${id}/shoppingitems`).then(
            response => {
                this.setState({
                    allShoppingItems: _.mapKeys(response.data.shoppingitems, 'item_id'),
                    count: response.data.count
                })
            }).catch(error =>{
                this.setState({
                    allShoppingItems: '',
                    count: '',
                    getErrorMessage: error.response.data.message
                })
            })
        }

    onPaginateItems = (id, limit, page) => {
        instance.get(`/shoppinglists/${id}/shoppingitems?limit=${limit}&page=${page}`).then(
            response => {
                this.setState({
                    allShoppingItems: _.mapKeys(response.data.shoppingitems, 'item_id'),
                    count: response.data.count
                })
            }).catch(error =>{
                    toastr.error(error.response.data.message)
            })
        } 

    onSearchShoppingItem = (id, term) => {
        instance.get(`/shoppinglists/${id}/shoppingitems?q=${term}`).then(
            response => {
                this.setState({
                    allShoppingItems: _.mapKeys(response.data.shoppingitems, 'item_id'),
                    count: response.data.count,
                    searchErrorMessage: ''
                })
            }).catch(error =>{
                this.setState({
                    allShoppingItems: '',
                    searchErrorMessage: error.response.data.message
                })
            })
        }
    deleteOneShoppingItem = (id, itemId) => {
        instance.delete(`/shoppinglists/${id}/shoppingitems/${itemId}`).then(
            response => {
                this.getAllShoppingItems(id);
                toastr.success('Shopping item successfully deleted!')
            }).catch(error =>{
                    toastr.error(error.response.data.message)
            })
    }
    deleteAllShoppingItems = (id) => {
        instance.delete(`/shoppinglists/${id}/shoppingitems`).then(
            response => {
                this.getAllShoppingItems(id);
                toastr.success('All shopping lists successfully deleted!')
            }).catch(error =>{
                    toastr.error(error.response.data.message)
            })
    }
    
    render(){
        const { id } = this.props.match.params;
        return(
            <div className="View">
                <div className="row">
                    <div className="col-xs-2">
                        <Button  
                            onClick={()=>this.props.history.push('/shoppinglists')}
                            >
                            Back
                        </Button>
                    </div>
                    <div className="col-xs-2">
                    <Button 
                        onClick={() => this.setState({showModal5:true})}
                        >
                        Add Item
                    </Button>
                    <Modal show={this.state.showModal5} onHide={() => this.setState({ showModal5:false})}>
                        <Modal.Header closeButton>
                            <Modal.Title>Shopping Item Form</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddItemForm 
                                itemname={this.state.itemname}
                                quantity={this.state.quantity}
                                units={this.state.units}
                                price={this.state.price}
                                currency={this.state.currency}
                                onChange={this.handleChange}
                                onSubmit={this.addShoppingItem}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                        <Button onClick={() => this.setState({ showModal5:false})}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                    </div>
                    <div className="col-xs-2">
                        <Button  
                            onClick={()=>{this.deleteAllShoppingItems(id)}}
                            >
                            Delete Items
                        </Button>
                    </div>
                    <div className="col-xs-6">
                        <input 
                        placeholder= "search items"
                        value = {this.state.term}
                        onChange={event => this.setState({term: event.target.value}, () => {
                        this.onSearchShoppingItem(id, this.state.term);
                        })} />
                    </div>
                </div>
                <ViewItems
                    props={this.props} 
                    id={id}
                    getAllShoppingItems={this.getAllShoppingItems}
                    listname={this.props.match.params.listname}
                    allShoppingItems={this.state.allShoppingItems}
                    deleteOneShoppingItem={this.deleteOneShoppingItem}
                    deleteAllShoppingItems={this.deleteAllShoppingItems}
                    getErrorMessage={this.state.getErrorMessage}
                    searchErrorMessage={this.state.searchErrorMessage}
                />
                <PaginateItems
                    listId={id}
                    countItems={this.state.count}
                    limitItems={this.state.limit}
                    onPaginateItems={this.onPaginateItems}
                />
            </div>
        );
    }
}
export default ItemsContainer;