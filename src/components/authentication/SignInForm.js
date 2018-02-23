import React from 'react';
import { 
    FormGroup, 
    ControlLabel,
    FormControl,
    Button 
} from 'react-bootstrap';

const SignInForm = (props) =>  {
    
    const { 
        email,
        password,
        onSubmit,
        onChange
    } = props;
  
    return (
        <form onSubmit={onSubmit}>
            <FormGroup
                controlId="email"
                >
                <ControlLabel>Email</ControlLabel>
                    <FormControl
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter email"
                        onChange={onChange}
                        required
                    />
            </FormGroup>
            <FormGroup
                controlId="password"
                >
                <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    />
            </FormGroup>
            <Button type="submit">Submit</Button>
            <FormControl.Feedback />
        </form>
    );
}
export default SignInForm;