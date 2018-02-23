import React, { Component } from 'react';
import instance from '../AxiosInstance';
import toastr from 'toastr';
import { 
    Modal,
    FormGroup, 
    ControlLabel,
    FormControl,
    Button 
} from 'react-bootstrap';

class UpdateListForm extends Component {
    constructor(props) {
      super(props);
  
      this.handleChange = this.handleChange.bind(this);
  
      this.state = {
        listname: props.listName,
      };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let values = new FormData();
        values.set("listname", this.state.listname);

        const { listId } = this.props;

        instance.put(`/shoppinglists/${listId}`, values).then(
            response => {
                this.setState({
                    showModal4: false 
                })
                this.props.getAllShoppingLists();
                toastr.success("You have successfully updated a shopping lists!")
            }).catch(error =>{
                    toastr.error(error.response.data.message)
            })
    }
  
    render() {
      return (
            <div>
                <button 
                    type="button" 
                    className="btn glyphicon glyphicon-edit text-primary"
                    onClick={() => this.setState({showModal4:true})} 
                    data-toggle="tooltip" 
                    data-placement="top" 
                    title="Update_List" 
                    />
                <Modal show={this.state.showModal4} onHide={() => this.setState({ showModal4:false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Shopping List</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup
                                controlId="Listname"
                                >
                                <ControlLabel>Listname</ControlLabel>
                                    <FormControl
                                        type="text"
                                        name="listname"
                                        value={this.state.listname}
                                        placeholder="Enter listname"
                                        onChange={this.handleChange}
                                        required
                                    />
                            </FormGroup>
                            <Button type="submit">Submit</Button>
                            <FormControl.Feedback />
                        </form>  
                        </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({ showModal4:false})}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
      );
    }
  }
  
export default UpdateListForm;