import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Config from '../../Config';

import NarBar from '../../components/common/NarBar';

describe('interface of NarBar component', () => {
    it('should render', () => {
        const wrapper = shallow(<NarBar />);
        expect(wrapper).toMatchSnapshot();
    });
});