import React from 'react'
import ReactDOM from 'react-dom'
import toJson from 'enzyme-to-json'
import { shallow, mount } from 'enzyme'
import Observer from './Observer'

global.IntersectionObserver = jest.fn()
jest.mock('./api')

const getProps = path => ( 
  { match: { params: { name: path } } } 
)

const getInstance = path => {
  const props = getProps(path)
  const wrapper = shallow(<Observer {...props} />, { disableLifecycleMethods: true })
  const inst = wrapper.instance()
  //console.log(inst)
  return inst
}

it(`getUrls('painting') should resolve`, () => {
  expect.assertions(4)

  const inst = getInstance('painting')
  return inst.getUrls(inst.props.match.params.name)
    .then(() => {
      const list = inst.state.list
      expect(list.length).toBe(3)
      // first two images to load
      expect(list[0].toLoad).toBe(true)
      expect(list[1].toLoad).toBe(true)
      expect(list[2].toLoad).toBe(false)
    })
})

it(`getUrls('unknown') should reject`, () => {
  expect.assertions(2)

  const inst = getInstance('unknown')
  return inst.getUrls(inst.props.match.params.name)
    .catch(error => {
      expect(error).toEqual({ error: 'invalid path' })
      expect(inst.state.list.length).toBe(0)
    })
})

// how can I test componentDidMount to be called?
it(`componentDidMount should have been called`, (done) => {
  expect.assertions(1)

  const props = getProps('painting')
  const wrapper = shallow(<Observer {...props} />, { disableLifecycleMethods: false })
  setTimeout(_ => {
    const state = wrapper.state()
    console.log('state:', state)
    expect(state.list.length).toBe(3)
    done()
  })
})

it(`componentWillUnmount should have been called`, () => {
  const unobserve = jest.fn()
  const getUrls = jest.fn()

  class Foo extends Observer {
    constructor(props) {
      super(props)
      this.unobserve = unobserve
      this.getUrls = getUrls
    }

    render() {
      return (<Observer {...this.props} />)
    }
  }

  const props = getProps('painting')
  const wrapper = shallow(<Foo {...props} />)
  
  expect(getUrls.mock.calls.length).toBe(1)
  expect(unobserve.mock.calls.length).toBe(0)
  expect(wrapper.props().match.params.name).toBe('painting')
  //expect(toJson(wrapper)).toMatchSnapshot()
  
  wrapper.unmount()

  expect(getUrls.mock.calls.length).toBe(1)
  expect(unobserve.mock.calls.length).toBe(1)
})

it(`componentWillReceiveProps should have been called`, () => {
  const unobserve = jest.fn()
  const getUrls = jest.fn()
  
  class Foo extends Observer {
    constructor(props) {
      super(props)
      this.unobserve = unobserve
      this.getUrls = getUrls
    }
  
    render() {
      return (<Observer {...this.props} />)
    }
  }
    
  const props = getProps('painting')
  const wrapper = shallow(<Foo {...props} />)

  expect(getUrls.mock.calls.length).toBe(1)
  expect(unobserve.mock.calls.length).toBe(0)
  expect(wrapper.props().match.params.name).toBe('painting')

  const nextProps = getProps('portrait')
  wrapper.setProps({...nextProps})

  expect(getUrls.mock.calls.length).toBe(2)
  expect(unobserve.mock.calls.length).toBe(1)
  expect(wrapper.props().match.params.name).toBe('portrait')
})
