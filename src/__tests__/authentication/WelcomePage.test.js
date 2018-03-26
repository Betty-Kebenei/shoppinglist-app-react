import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Config from '../../Config';

import WelcomePage from '../../components/authentication/WelcomePage';

describe('interface of WelcomePage component', () => {
    it('should render form', () => {
        const wrapper = shallow(<WelcomePage />);
        expect(wrapper).toMatchSnapshot();
    });
});