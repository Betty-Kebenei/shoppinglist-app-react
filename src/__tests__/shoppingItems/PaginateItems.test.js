import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Config from '../../Config';

import PaginateItems from '../../components/shoppingitems/PaginateItems';

describe('interface of PaginateItems component', () => {
    it('should render', () => {
        const wrapper = shallow(<PaginateItems />);
        expect(wrapper).toMatchSnapshot();
    });
});