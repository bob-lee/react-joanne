import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import Work from './Work';
import { list } from './images.test'

// Object.defineProperty(window, 'matchMedia', {
//   value: jest.fn(() => ({ matches: matches }))
// });

// IntersectionObserver = jest.fn(callback => console.log)
// window.IntersectionObserver = IntersectionObserver
// window.IntersectionObserver.mockImplementation(() => {
//   return {
//     observe: jest.fn(),
//     unobserve: jest.fn()
//   }
// })
global.IntersectionObserver = jest.fn()
global.fetch = jest.fn(() => new Promise(resolve => resolve(list)))
//global.json = jest.fn(data => data)

// it(`Work renders correctly`, () => {
//   const wrapper = shallow(<Work />);
//   expect(toJson(wrapper)).toMatchSnapshot();
// });
/*
const props = {
  match: {
    params: [
      { name: "painting"}
    ]
  }
}
*/
it('Work renders without crashing', () => {
  const div = document.createElement('div');
  //props.match.params.name
  const props = { match : { params : {name: "painting" }}}
  ReactDOM.render(<Work {...props} />, div);
  //ReactDOM.render(<Router><Work /></Router>, div);
});

// it('Work renders correctly', () => {
//   const tree = renderer
//     .create(<Work />)
//     .toJSON();
//   expect(tree).toMatchSnapshot();
// });
