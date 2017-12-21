import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import Images from './Images';

export const list = [
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

const handleImageLoaded = jest.fn()

it('Images renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Images list={list} onImageLoaded={handleImageLoaded} />, div);
});

it('Images renders correctly', () => {
  const tree = renderer
    .create(<Images list={list} onImageLoaded={handleImageLoaded} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// it(`Images renders correctly`, () => {
//   const wrapper = shallow(<Images list={list} onImageLoaded={handleImageLoaded} />);
//   expect(toJson(wrapper)).toMatchSnapshot();
// });

it(`Images renders correctly after first image loaded`, () => {
  const wrapper = mount(<Images list={list} onImageLoaded={handleImageLoaded} />);
  const firstChild = wrapper.find('.images').childAt(0)
  //console.log(firstChild)
  firstChild.find('img.image1').simulate('load');
  expect(toJson(wrapper)).toMatchSnapshot();
});
