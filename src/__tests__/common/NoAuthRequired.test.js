import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Config from '../../Config';

import NoAuthRequired from '../../components/common/NoAuthRequired';

describe('interface of NoAuthRequired component', () => {
    it('should render', () => {
        const wrapper = shallow(<NoAuthRequired />);
        expect(wrapper).toMatchSnapshot();
    });
});