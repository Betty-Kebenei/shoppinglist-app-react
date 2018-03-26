import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Config from '../../Config';

import UpdateItemForm from '../../components/shoppingitems/UpdateItemForm';

describe('interface of UpdateItemForm component', () => {
    it('should render', () => {
        const wrapper = shallow(<UpdateItemForm />);
        expect(wrapper).toMatchSnapshot();
    });
});