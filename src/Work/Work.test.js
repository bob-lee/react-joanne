import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import toJson from 'enzyme-to-json'
import { shallow, mount } from 'enzyme'
import Work from './Work'

global.IntersectionObserver = jest.fn()
jest.mock('./api')

const getProps = path => ( 
  { match: { params: { name: path } } } 
)

it('Work renders without crashing', () => {
  const props = getProps('painting')
  const div = document.createElement('div')
  ReactDOM.render(<Work {...props} />, div)
})

it('Work renders correctly', () => {
  const props = getProps('painting')
  const tree = renderer
    .create(<Work {...props} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it(`Work shallow-renders correctly`, () => {
  const props = getProps('painting')
  const wrapper = shallow(<Work {...props} />)

  expect(toJson(wrapper)).toMatchSnapshot()
})

it(`Work full-renders correctly`, () => {
  const props = getProps('painting')
  const wrapper = mount(<Work {...props} />)

  expect(toJson(wrapper)).toMatchSnapshot()
})