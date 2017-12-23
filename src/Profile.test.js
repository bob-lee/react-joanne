import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Profile from './Profile'

it('Profile renders without crashing', () => {
  isTouchDevice(true)
  const div = document.createElement('div')
  ReactDOM.render(<Profile />, div)
})

it('Profile renders correctly for touch device', () => {
  isTouchDevice(true)
  const tree = renderer
    .create(<Profile />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('Profile renders correctly for non-touch device', () => {
  isTouchDevice(false)
  const tree = renderer
    .create(<Profile />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it(`initially should have empty {} style`, () => {
  isTouchDevice(true)
  const wrapper = shallow(<Profile />)
  expect(wrapper.state().style).toEqual({})
})

it(`should have {animationPlayState:'running'} style on 1st click`, () => {
  isTouchDevice(true)
  const wrapper = shallow(<Profile />)
  wrapper.simulate('click')
  expect(wrapper.state().style.animationPlayState).toBe('running')
})

it(`should toggle animationPlayState on 2nd click`, () => {
  isTouchDevice(true)
  const wrapper = shallow(<Profile />)
  //console.log(wrapper.instance())
  
  wrapper.simulate('click')
  wrapper.simulate('click')
  expect(wrapper.state().style.animationPlayState).toBe('paused')
})
