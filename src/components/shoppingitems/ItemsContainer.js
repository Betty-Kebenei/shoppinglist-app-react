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
            allShoppingItems: [],
            count: 0,
            limit: 5,
            searchErrorMessage: ''
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        this.getAllShoppingItems(id);
    }

    getAllShoppingItems = (id) => {
        instance.get(`/shoppinglists/${id}/shoppingitems`).then(
            response => {
                this.setState({
                    allShoppingItems: _.mapKeys(response.data.shoppingitems, 'item_id'),
                    count: response.data.count
                })
            }).catch(error =>{
                    toastr.error(error.response.data.message)
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
                        <AddItemForm 
                            id={id}
                            getAllShoppingItems={this.getAllShoppingItems}
                        />
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