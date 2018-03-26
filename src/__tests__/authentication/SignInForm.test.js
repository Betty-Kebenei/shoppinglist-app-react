import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Config from '../../Config';

import SignInForm from '../../components/authentication/SignInForm';

describe('interface of SignInForm component', () => {
    it('should render', () => {
        const wrapper = shallow(<SignInForm />);
        expect(wrapper).toMatchSnapshot();
    });
});