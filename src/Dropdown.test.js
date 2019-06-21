import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import { BrowserRouter as Router } from 'react-router-dom'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import Dropdown from './Dropdown'

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

function firstRender() {
  act(() => {
    ReactDOM.render(<Router><Dropdown title="work" /></Router>, container)
  })
}

it('Dropdown renders without crashing', () => {
  firstRender()
})

it(`Dropdown initially should be unchecked`, () => {
  firstRender()

  const input = container.querySelector('input')
  expect(input.checked).toBe(false)
  //const label = container.querySelector('label')
  //expect(label.textContent).toBe('work')
})

it(`Dropdown should be checked on label-click`, () => {
  firstRender()

  const input = container.querySelector('input')
  act(() => {
    input.dispatchEvent(new MouseEvent('click', {bubbles: true}))
  })
  expect(input.checked).toBe(true)
})

it(`Dropdown should be unchecked on submenu-click`, () => {
  firstRender()

  const input = container.querySelector('input')
  act(() => {
    input.dispatchEvent(new MouseEvent('click', {bubbles: true}))
  })
  expect(input.checked).toBe(true)

  const submenu = container.querySelector('.dd')
  act(() => {
    submenu.dispatchEvent(new MouseEvent('click', {bubbles: true}))
  })
  expect(input.checked).toBe(false)
})

it(`Dropdown should be unchecked on overlay-click`, () => {
  firstRender()

  const input = container.querySelector('input')
  act(() => {
    input.dispatchEvent(new MouseEvent('click', {bubbles: true}))
  })
  expect(input.checked).toBe(true)

  const overlay = container.querySelector('.overlay')
  act(() => {
    overlay.dispatchEvent(new MouseEvent('click', {bubbles: true}))
  })
  expect(input.checked).toBe(false)
})

it(`shouldn't have 'active' class for non-work page`, () => {
  const wrapper = shallow(<Dropdown title="work" />)
  //console.log(wrapper.props())

  expect(wrapper.props().className).not.toMatch(/active/)
  expect(toJson(wrapper)).toMatchSnapshot()
})

it(`should have 'active' class for '/work/painting' page`, () => {
  const wrapper = shallow(<Dropdown title="painting" />)
  //console.log(wrapper.props())
  //console.log(wrapper.instance())

  expect(wrapper.props().className).toMatch(/active/)
  expect(toJson(wrapper)).toMatchSnapshot()
})
