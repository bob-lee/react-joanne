import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import Profile from './Profile'






let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

function firstRender(matches) {
  isTouchDevice(matches)
  act(() => {
    ReactDOM.render(<Profile />, container)
  })
}

it('Profile renders without crashing 2', () => {
  firstRender(false)
})

// it('Profile renders correctly for non-touch device2', () => {
//   firstRender(false)
  
//   const profile = container.querySelector('.profile')
//   const style = window.getComputedStyle(profile, null)
//   console.log('style', style)
//   expect(style).toEqual({})
// })



it(`should have {animationPlayState:'running'} style on 1st click 2`, () => {
  firstRender(true)

  const profile = container.querySelector('.profile')
  act(() => {
    profile.dispatchEvent(new MouseEvent('click', {bubbles: true}))
  })

  const profileStyle = profile.style
  const computedStyle = window.getComputedStyle(profile, null);
  console.log('profileStyle', profileStyle.cssText)
  console.log('computedStyle', computedStyle.cssText)
  // console.log('profileStyle', profileStyle['animationPlayState'])
  // console.log('computedStyle', computedStyle['animationPlayState'])
  // let out = ''
  for (const prop in computedStyle) {
    if (computedStyle.hasOwnProperty(prop)) {
      console.log('property', prop)
    }
  }
  // console.log('style properties', out)
  //expect(input.checked).toBe(true)

  // const wrapper = shallow(<Profile />)
  // wrapper.simulate('click')
  // //expect(wrapper.state().style.animationPlayState).toBe('running')
  // expect(wrapper.props().style.animationPlayState).toBe('running')
})









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
  //expect(wrapper.state().style).toEqual({})
  expect(wrapper.props().style).toEqual({})
})

it(`should have {animationPlayState:'running'} style on 1st click`, () => {
  isTouchDevice(true)
  const wrapper = shallow(<Profile />)
  wrapper.simulate('click')
  //expect(wrapper.state().style.animationPlayState).toBe('running')
  expect(wrapper.props().style.animationPlayState).toBe('running')
})

it(`should toggle animationPlayState on 2nd click`, () => {
  isTouchDevice(true)
  const wrapper = shallow(<Profile />)
  
  //expect(wrapper.debug()).toMatchSnapshot()
  wrapper.simulate('click')
  expect(wrapper.props().style.animationPlayState).toBe('running')
  wrapper.simulate('click')
  //expect(wrapper.state().style.animationPlayState).toBe('paused')
  expect(wrapper.props().style.animationPlayState).toBe('paused')
})
