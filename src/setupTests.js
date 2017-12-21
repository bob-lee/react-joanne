import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { shallow, render, mount } from 'enzyme';

configure({ adapter: new Adapter() });

global.chai = chai
global.shallow = shallow;
global.mount = mount;
chai.use(chaiEnzyme())