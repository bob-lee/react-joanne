import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import Dropdown from './Dropdown';

const renderWithTitle = (title) => {
  return renderer
    .create(<Router><Dropdown title={title} /></Router>)
    .toJSON();
}

it('Dropdown renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><Dropdown title="work" /></Router>, div);
});
/*
it('Dropdown renders correctly for non-work page', () => {
  expect(renderWithTitle('work')).toMatchSnapshot();
});

it(`Dropdown renders correctly for '/work/painting' page`, () => {
  expect(renderWithTitle('painting')).toMatchSnapshot();
});
*/
it(`shouldn't have 'active' class for non-work page`, () => {
  const wrapper = shallow(<Dropdown title="work" />);
  //console.log(wrapper.props());

  expect(wrapper.props().className).not.toMatch(/active/)
  expect(toJson(wrapper)).toMatchSnapshot();
});

it(`should have 'active' class for '/work/painting' page`, () => {
  const wrapper = shallow(<Dropdown title="painting" />);
  //console.log(wrapper.props());

  expect(wrapper.props().className).toMatch(/active/)
  expect(toJson(wrapper)).toMatchSnapshot();
});

it(`initially should be unchecked`, () => {
  const wrapper = shallow(<Dropdown title="work" />);
  expect(wrapper.state().checked).toBe(false);
});

it(`should be checked on label-click`, () => {
  const wrapper = shallow(<Dropdown title="work" />);
  wrapper.find('input').simulate('change');
  expect(wrapper.state().checked).toBe(true);
});

it(`should be unchecked on submenu-click`, () => {
  const wrapper = shallow(<Dropdown title="work" />);
  //wrapper.find('input').simulate('change');
  wrapper.find('.dd').simulate('click');
  expect(wrapper.state().checked).toBe(false);
});

it(`should be unchecked on overlay-click`, () => {
  const wrapper = shallow(<Dropdown title="work" />);
  //wrapper.find('input').simulate('change');
  wrapper.find('.overlay').simulate('click');
  expect(wrapper.state().checked).toBe(false);
});
