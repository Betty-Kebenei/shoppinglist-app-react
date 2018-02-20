import React, { Component } from 'react';
import instance from '../AxiosInstance';
import toastr from 'toastr';
import { 
    Modal,
    FormGroup, 
    ControlLabel,
    FormControl,
    HelpBlock,
    Button 
} from 'react-bootstrap';

class AddItemForm extends Component {
    constructor(props) {
      super(props);
  
      this.handleChange = this.handleChange.bind(this);
  
      this.state = {
        itemname: '',
        quantity:'',
        units:'',
        price:'',
        currency:''
      };
      console.log(props)
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let values = new FormData();
        values.set("itemname", this.state.itemname);
        values.set("quantity", this.state.quantity);
        values.set("units", this.state.units);
        values.set("price", this.state.price);
        values.set("currency", this.state.currency);

        const { id } = this.props;

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
                this.props.getAllShoppingItems(id);
                toastr.success("You have successfully created a shopping item!");
            }
        ).catch(error => {
            toastr.error(error.response.data.message)
        })
    }
  
    render() {
        console.log(this.props)
      return (
            <div>
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
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup
                                controlId="Itemname"
                                >
                                <ControlLabel>Itemname</ControlLabel>
                                    <FormControl
                                        type="text"
                                        name="itemname"
                                        value={this.state.itemname}
                                        placeholder="Enter itemname"
                                        onChange={this.handleChange}
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
                                        value={this.state.quantity}
                                        placeholder="Enter quantity"
                                        onChange={this.handleChange}
                                    />
                            </FormGroup>
                            <FormGroup
                                controlId="Units"
                                >
                                <ControlLabel>Units of Measurement</ControlLabel>
                                    <FormControl
                                        type="text"
                                        name="units"
                                        value={this.state.units}
                                        placeholder="Enter units"
                                        onChange={this.handleChange}
                                    />
                            </FormGroup>
                            <FormGroup
                                controlId="Price"
                                >
                                <ControlLabel>Price</ControlLabel>
                                    <FormControl
                                        type="text"
                                        name="price"
                                        value={this.state.price}
                                        placeholder="Enter price"
                                        onChange={this.handleChange}
                                    />
                            </FormGroup>
                            <FormGroup
                                controlId="currency"
                                >
                                <ControlLabel>Currency</ControlLabel>
                                    <FormControl
                                        type="text"
                                        name="currency"
                                        value={this.state.currency}
                                        placeholder="Enter currency"
                                        onChange={this.handleChange}
                                    />
                            </FormGroup>
                            <Button type="submit">Submit</Button>
                            <FormControl.Feedback />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={() => this.setState({ showModal5:false})}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
      );
    }
  }
  
export default AddItemForm;