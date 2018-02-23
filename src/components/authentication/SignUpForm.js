import React from 'react';
import { 
    FormGroup,
    ControlLabel,
    FormControl,
    Button 
} from 'react-bootstrap';

const SignUpForm = (props) => {

    const {
        onSubmit,
        handleChange,
        username,
        email,
        password,
        repeat_password,
    } = props;

    const getValidationState = () => {
      const length = password.length;
      if (length > 6) return 'success';
      else if (length > 3) return 'warning';
      else if (length > 0) return 'error';
      return null;
    }

    // Return a registration react-bootstrap form.
    return (
        <form onSubmit={onSubmit}>
            <FormGroup
                controlId="text"
                >
                <ControlLabel>Username</ControlLabel>
                    <FormControl
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Enter username"
                        onChange={handleChange}
                        required
                    />
            </FormGroup>
            <FormGroup
                controlId="email"
                >
                <ControlLabel>Email</ControlLabel>
                    <FormControl
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter email"
                        onChange={handleChange}
                        required
                    />
            </FormGroup>
            <FormGroup
                controlId="password"
                validationState={getValidationState()}
                >
                <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
            </FormGroup>
            <FormGroup
                controlId="repeat_password"
                validationState={getValidationState()}
                >
                <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        type="password"
                        name="repeat_password"
                        value={repeat_password}
                        onChange={handleChange}
                        required
                    />
            </FormGroup>
            <Button type="submit">Submit</Button>
            <FormControl.Feedback />
        </form>
    );
} 
export default SignUpForm;