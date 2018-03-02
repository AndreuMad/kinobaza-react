'use strict';
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import Posts from 'Screens/Posts';

describe('Posts Component', () => {
  it('Page should have class "posts-page"', () => {
    const wrapper = mount(<Posts />);
    expect(wrapper.is('.posts-page')).to.equal(true);
  });

  it('Should render title', () => {
    const wrapper = mount(<Posts />);
    expect(wrapper.children()[0].children()[0].is('.section-heading')).to.equal(true);
  });
});
