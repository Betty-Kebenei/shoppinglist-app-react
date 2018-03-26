import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Config from '../../Config';

import AuthRequired from '../../components/common/AuthRequired';

describe('interface of AuthRequired component', () => {
    it('should render', () => {
        const wrapper = shallow(<AuthRequired />);
        expect(wrapper).toMatchSnapshot();
    });
});