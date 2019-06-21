import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import toJson from 'enzyme-to-json'
import Image from './Image'

const getItem = (toLoad) => ({ 
  fileName: 'test.jpg',
  url: '/test.jpg',
  thumbUrl: '/test_thumb.jpg',
  text: 'test',
  toLoad: toLoad
})

const getProps = (toLoad) => ({
  item: getItem(toLoad),
  index: 0,
  onImageLoaded: jest.fn()
})

it('Image renders without crashing', () => {
  const props = getProps(true)
  const div = document.createElement('div')
  ReactDOM.render(<Image {...props} />, div)
})

it('Image renders correctly with toLoad=true', () => {
  const props = getProps(true)
  const tree = renderer
    .create(<Image {...props} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('Image renders correctly with toLoad=false', () => {
  const props = getProps(false)
  const tree = renderer
    .create(<Image {...props} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it(`onImageLoaded should be called on 'load' event`, () => {
  const props = getProps(true)
  const wrapper = shallow(<Image {...props} />)
  expect(wrapper.exists()).toBe(true)
  expect(props.onImageLoaded.mock.calls.length).toBe(0)
  wrapper.find('img.image1').simulate('load')
  const calls = props.onImageLoaded.mock.calls
  console.log(calls[0])
  expect(calls.length).toBe(1)
  expect(calls[0][0]).toEqual({element: null, index: props.index})
  expect(toJson(wrapper)).toMatchSnapshot()
})
