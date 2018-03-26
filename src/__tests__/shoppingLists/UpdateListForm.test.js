import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Config from '../../Config';

import UpdateListForm from '../../components/shoppinglists/UpdateListForm';

describe('interface of UpdateListForm component', () => {
    it('should render', () => {
        const wrapper = shallow(<UpdateListForm />);
        expect(wrapper).toMatchSnapshot();
    });
});