import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Home from './Home'

it('Home renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Home />, div)
})

it('Home renders correctly', () => {
  const tree = renderer
    .create(<Home />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
