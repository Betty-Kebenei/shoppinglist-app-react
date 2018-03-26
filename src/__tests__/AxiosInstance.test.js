import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Config from '../Config';

import AxiosInstance from '../components/AxiosInstance';

describe('interface of AxiosInstance component', () => {
    it('should render', () => {
        const wrapper = shallow(<AxiosInstance />);
        expect(wrapper).toMatchSnapshot();
    });
});