import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Config from '../../Config';

import PaginateLists from '../../components/shoppinglists/PaginateLists';

describe('interface of PaginateLists component', () => {
    it('should render', () => {
        const wrapper = shallow(<PaginateLists />);
        expect(wrapper).toMatchSnapshot();
    });
});