import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import renderer from 'react-test-renderer'
import App from './App'

it('App renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Router><App /></Router>, div)
})
