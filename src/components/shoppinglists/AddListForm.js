import React from 'react';
import { 
    FormGroup, 
    ControlLabel,
    FormControl,
    Button 
} from 'react-bootstrap';

const AddListForm = (props) => {

    const {
        listName,
        onChange,
        onSubmit
    } = props;

    // Return an add list react-bootstrap form.
    return (
        <div>
            <form onSubmit={onSubmit}>
                <FormGroup
                    controlId="Listname"
                    >
                    <ControlLabel>Listname</ControlLabel>
                        <FormControl
                            type="text"
                            name="listname"
                            value={listName}
                            placeholder="Enter listname"
                            onChange={onChange}
                            required
                        />
                </FormGroup>
                <Button type="submit">Submit</Button>
                <FormControl.Feedback />
            </form>
        </div>
    );
}
export default AddListForm;