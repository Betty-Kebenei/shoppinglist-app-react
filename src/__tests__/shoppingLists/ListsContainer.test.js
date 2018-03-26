import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Config from '../../Config';

import ListsContainer from '../../components/shoppinglists/ListsContainer';

describe('interface of ListsContainer component', () => {
    it('should render', () => {
        const wrapper = shallow(<ListsContainer />);
        expect(wrapper).toMatchSnapshot();
    });
});