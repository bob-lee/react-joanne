import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import toJson from 'enzyme-to-json'
import Images from './Images'

const list = [
  {
    fileName: 'test1.jpg',
    url: '/test1.jpg',
    thumbUrl: '/test1_thumb.jpg',
    text: 'test1',
    toLoad: true
  },
  {
    fileName: 'test2.jpg',
    url: '/test2.jpg',
    thumbUrl: '/test2_thumb.jpg',
    text: 'test2',
    toLoad: false
  }
]

const getProps = (hash) => ({
  list,
  hash, 
  workOnClick: jest.fn(), 
  workOnLoad: jest.fn()
})
const handleImageLoaded = jest.fn()

it('Images renders without crashing', () => {
  isTouchDevice(false)
  const props = getProps('')
  const div = document.createElement('div')
  ReactDOM.render(<Images {...props} />, div)
})

it('Images renders correctly', () => {
  isTouchDevice(false)
  const props = getProps('')
  const tree = renderer
    .create(<Images {...props} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it(`Images renders correctly after first image loaded`, () => {
  isTouchDevice(false)
  const props = getProps('')
  const wrapper = mount(<Images {...props} />)
  const firstChild = wrapper.find('.images').childAt(0)
  //console.log(firstChild)
  firstChild.find('img.image1').simulate('load')
  expect(toJson(wrapper)).toMatchSnapshot()
})
