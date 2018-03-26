import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Config from '../../Config';

import AddListForm from '../../components/shoppinglists/AddListForm';

describe('interface of AddListForm component', () => {
    it('should render', () => {
        const wrapper = shallow(<AddListForm />);
        expect(wrapper).toMatchSnapshot();
    });
});