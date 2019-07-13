import React from 'react'
import {
  render,
  cleanup,
  waitForElement,
  getAllByAltText,
} from '@testing-library/react'
import 'jest-dom/extend-expect'
import Work from './Work'

global.IntersectionObserver = jest.fn()
jest.mock('./api')

const getProps = path => ( 
  { 
    match: { params: { name: path } },
    location: { hash: '' } 
  } 
)

afterEach(cleanup)

it('makes an initial API call and renders, first two images to have src provided', async () => {
  isTouchDevice(false)
  const props = getProps('painting')
  const {getAllByTitle, container} = render(
    <Work {...props} />,
  )

  const imageNodes = await waitForElement(() => getAllByTitle('image'))
  const thumbNodes = getAllByAltText(container, 'thumb')
  console.log(`found ${imageNodes.length} image(s)`)
  console.log(`found ${thumbNodes.length} thumb(s)`)

  expect(container.firstChild).toMatchSnapshot()
  expect(imageNodes.length).toBe(3)
  expect(imageNodes[0].src).toBeTruthy()
  expect(imageNodes[1].src).toBeTruthy()
  expect(imageNodes[2].src).toBeFalsy()
  expect(thumbNodes.length).toBe(2)
})
