import '../../index.css';

import React from 'react';
import _ from 'lodash';
import UpdateListForm from './UpdateListForm';

const ViewLists = (props) => {
    const {
        getAllShoppingLists,
        allShoppingLists,
        deleteOneShoppingList,
        getErrorMessage,
        searchErrorMessage,
    } = props;

    const renderShoppinglists = () =>  (
        _.map(allShoppingLists, shoppinglist => {
            const list_id = shoppinglist.list_id;
            return (
                <tr key={list_id}>
                    <td>{shoppinglist.list_id}</td>
                    <td>{shoppinglist.listname}</td>
                    <td>
                        <button 
                            type="button" 
                            className="btn glyphicon glyphicon-file text-primary"
                            onClick={()=>props.props.history.push(
                                `/${list_id}/${shoppinglist.listname}/shoppingitems`)}
                            data-toggle="tooltip" 
                            data-placement="top" 
                            title="View Items" 
                        />  
                        
                        <UpdateListForm
                            listId={shoppinglist.list_id}
                            listName={shoppinglist.listname}
                            getAllShoppingLists ={getAllShoppingLists}
                        />

                        <button 
                            type="button" 
                            className="btn glyphicon glyphicon-trash text-primary"
                            onClick={()=>{deleteOneShoppingList(shoppinglist.list_id)}} 
                            data-toggle="tooltip" 
                            data-placement="top" 
                            title="Delete_item" 
                        />  
                    </td>                  
                </tr>
                
            );
        })
    );
    return(
        <div className="View">
            <h2>Shopping Lists:</h2>
            <div className="col-sm-12">
                <table className="table bordered">
                    <thead>
                        <tr>  
                            <td>LIST ID</td>
                            <td>LISTNAME</td>
                            <td>ACTIONS</td>
                        </tr>
                    </thead>
                    <tbody>
                        {renderShoppinglists()}
                    </tbody>
                </table>
                {getErrorMessage}
                {searchErrorMessage}
            </div>
        </div>
    );
}
export default ViewLists;
