import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Contact from './Contact';

// const isTouchDevice = (matches) => {
//   Object.defineProperty(window, 'matchMedia', {
//     value: jest.fn(() => {
//       return { matches: matches }
//     })
//   });
// }
const isTouchDevice = (matches) => {
  Object.defineProperty(window, 'matchMedia', {
    value: jest.fn(() => ({ matches: matches }))
  });
}

it('Contact renders without crashing', () => {
  isTouchDevice(true);
  const div = document.createElement('div');
  ReactDOM.render(<Contact />, div);
});

it('Contact renders correctly for touch device', () => {
  isTouchDevice(true);
  const tree = renderer
    .create(<Contact />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Contact renders correctly for non-touch device', () => {
  isTouchDevice(false);
  const tree = renderer
    .create(<Contact />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
