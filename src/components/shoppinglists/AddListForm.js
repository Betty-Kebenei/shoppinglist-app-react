import React, { Component } from 'react';
import instance from '../AxiosInstance';
import toastr from 'toastr';
import { 
    FormGroup, 
    ControlLabel,
    FormControl,
    HelpBlock,
    Button 
} from 'react-bootstrap';

class AddListForm extends Component {
    constructor(props) {
      super(props);
  
      this.handleChange = this.handleChange.bind(this);
  
      this.state = {
        listname: '',
        showModal3: false
      };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let values = new FormData();
        values.set("listname", this.state.listname);

        instance.post('/shoppinglists', values).then(
            response => {
                this.setState({listname:''});
                this.props.getAllShoppingLists();
                this.props.closeModal();
                toastr.success("You have successfully created a shopping lists!")
            }
        ).catch(error => {
            toastr.error(error.response.data.message)
        })
    }
  
    render() {
      return (
            <div>
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
            </div>
      );
    }
  }
  
export default AddListForm;