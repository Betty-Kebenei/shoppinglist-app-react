import React from 'react';
import _ from 'lodash';
import UpdateItemForm from './UpdateItemForm';

const ViewItems = (props) => {
    const {
        id,
        listname,
        allShoppingItems,
        deleteOneShoppingItem,
        getAllShoppingItems,
        getErrorMessage,
        searchErrorMessage
    } = props;

    // Display shopping items in a table.
    const renderShoppingitems = () => (
        
        _.map(allShoppingItems, item => {
            return (
                <tr key={item.item_id}>
                    <td>{item.itemname}</td>
                    <td>{item.quantity}</td>
                    <td>{item.units}</td>
                    <td>{item.price}</td>
                    <td>{item.currency}</td>
                    <td>

                    <UpdateItemForm
                        props={props}
                        listId={id}
                        listName={listname}
                        itemId={item.item_id}
                        itemName={item.itemname}
                        quantity={item.quantity}
                        units={item.units}
                        price={item.price}
                        currency={item.currency}
                        getAllShoppingItems={getAllShoppingItems}
                    />

                    <button 
                        type="button" 
                        className="btn glyphicon glyphicon-trash text-primary" 
                        onClick={()=>deleteOneShoppingItem(id, item.item_id)}
                        data-toggle="tooltip" 
                        data-placement="top" 
                        title="Delete_item" 
                        />  

                    </td>
                </tr>
            );
        })
    )
    return( 
        <div className="View col-sm-12">
            <h2>Shopping items for: {listname}</h2><br />
            <div className="col-sm-12">
                <table className="table bordered">
                    <thead>
                        <tr>
                            <td>ITEMNAME</td>
                            <td>QUANTITY</td>
                            <td>UNITS</td>
                            <td>PRICE</td>
                            <td>CURRENCY</td>
                            <td>ACTIONS</td> 
                        </tr>
                    </thead>
                    <tbody>
                        {renderShoppingitems()}
                    </tbody>
                </table>
                {getErrorMessage}
                {searchErrorMessage}
            </div>
        </div>
    );
}
export default ViewItems;