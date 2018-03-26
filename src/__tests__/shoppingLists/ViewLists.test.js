import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Config from '../../Config';

import ViewLists from '../../components/shoppinglists/ViewLists';

describe('interface of ViewLists component', () => {
    it('should render', () => {
        const wrapper = shallow(<ViewLists />);
        expect(wrapper).toMatchSnapshot();
    });
});