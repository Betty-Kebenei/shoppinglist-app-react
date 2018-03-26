import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Config from '../../Config';

import ItemsContainer from '../../components/shoppingitems/ItemsContainer';

describe('interface of ItemsContainer component', () => {
    it('should render', () => {
        const wrapper = shallow(<ItemsContainer />);
        expect(wrapper).toMatchSnapshot();
    });
});