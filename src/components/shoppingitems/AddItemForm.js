import React from 'react';
import {
    FormGroup, 
    ControlLabel,
    FormControl,
    Button 
} from 'react-bootstrap';

const AddItemForm = (props) => {

    const {
        itemname,
        quantity,
        units,
        price,
        currency,
        onChange,
        onSubmit
    } = props;

    // Return an add item react-bootstrap form.
    return (
        <div>
            <form onSubmit={onSubmit}>
                <FormGroup
                    controlId="Itemname"
                    >
                    <ControlLabel>Itemname</ControlLabel>
                        <FormControl
                            type="text"
                            name="itemname"
                            value={itemname}
                            placeholder="Enter itemname"
                            onChange={onChange}
                            required
                        />
                </FormGroup>
                <FormGroup
                    controlId="Quantity"
                    >
                    <ControlLabel>Quantity</ControlLabel>
                        <FormControl
                            type="text"
                            name="quantity"
                            value={quantity}
                            placeholder="Enter quantity"
                            onChange={onChange}
                        />
                </FormGroup>
                <FormGroup
                    controlId="Units"
                    >
                    <ControlLabel>Units of Measurement</ControlLabel>
                        <FormControl
                            type="text"
                            name="units"
                            value={units}
                            placeholder="Enter units"
                            onChange={onChange}
                        />
                </FormGroup>
                <FormGroup
                    controlId="Price"
                    >
                    <ControlLabel>Price</ControlLabel>
                        <FormControl
                            type="text"
                            name="price"
                            value={price}
                            placeholder="Enter price"
                            onChange={onChange}
                        />
                </FormGroup>
                <FormGroup
                    controlId="currency"
                    >
                    <ControlLabel>Currency</ControlLabel>
                        <FormControl
                            type="text"
                            name="currency"
                            value={currency}
                            placeholder="Enter currency"
                            onChange={onChange}
                        />
                </FormGroup>
                <Button type="submit">Submit</Button>
                <FormControl.Feedback />
            </form>   
        </div>
    );
} 
export default AddItemForm;