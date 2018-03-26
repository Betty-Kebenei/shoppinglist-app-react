import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Config from '../../Config';

import NotFound from '../../components/common/NotFound';

describe('interface of NotFound component', () => {
    it('should render', () => {
        const wrapper = shallow(<NotFound />);
        expect(wrapper).toMatchSnapshot();
    });
});