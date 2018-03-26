import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Config from '../../Config';

import ViewItems from '../../components/shoppingitems/ViewItems';

describe('interface of ViewItems component', () => {
    it('should render', () => {
        const wrapper = shallow(<ViewItems />);
        expect(wrapper).toMatchSnapshot();
    });
});