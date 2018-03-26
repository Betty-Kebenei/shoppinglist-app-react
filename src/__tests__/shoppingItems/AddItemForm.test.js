import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Config from '../../Config';

import AddItemForm from '../../components/shoppingitems/AddItemForm';

describe('interface of AddItemForm component', () => {
    it('should render', () => {
        const wrapper = shallow(<AddItemForm />);
        expect(wrapper).toMatchSnapshot();
    });
});