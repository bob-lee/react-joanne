import React from 'react';
import { NavLink } from 'react-router-dom'

export default class Dropdown extends React.Component {
  state = { checked: false }

  // constructor(props) {
  //   super(props)
  // }

  handleInputChange = event => {
    //console.log('handleInputChange', event.target)
    this.setState({ checked: true })
  }

  handleOverlay = () => {
    console.log('overlay')
    this.setState({ checked: false })
  }

  render() {
    const classes = `ddm ${this.props.title === 'work' ? '' : 'active'}`
    return (
      <div className={classes} to="/work">
        <input type="checkbox" id="ddm-1"
          checked={this.state.checked}
          onChange={this.handleInputChange} />
        <label htmlFor="ddm-1" className="header-menu-item">{this.props.title}</label>
        <i className="fa fa-angle-right fa-lg" aria-hidden="true"></i>
        <div className="dd" onClick={this.handleOverlay}>
          <NavLink activeClassName="active" to="/work/portrait">portrait</NavLink>
          <NavLink activeClassName="active" to="/work/painting">painting</NavLink>
          <NavLink activeClassName="active" to="/work/illustration">illustration</NavLink>
        </div>
        <div className="overlay" onClick={this.handleOverlay}>
        </div>
      </div>
    )
  }
}