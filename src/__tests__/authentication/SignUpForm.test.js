import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Config from '../../Config';

import SignUpForm from '../../components/authentication/SignUpForm';

describe('interface of SignUpForm component', () => {
    it('should render', () => {
        const wrapper = shallow(<SignUpForm />);
        expect(wrapper).toMatchSnapshot();
    });
});