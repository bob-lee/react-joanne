import React, { Component } from 'react';
import { NavLink, Route, withRouter, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Home from './Home'
import Profile from './Profile'
import Work from './Work/Work'
import Contact from './Contact'
import Dropdown from './Dropdown'
if (typeof window !== 'undefined') {
  require('./App.css')
}

const timeout = { enter: 1000, exit: 1000 }

class App extends Component {
  titleWork = 'work'

  componentWillMount() {
    console.info('App componentWillMount', this.props.location)
    this.setTitleWork(this.props.location.pathname);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.location !== nextProps.location) {
      this.setTitleWork(nextProps.location.pathname);
    }
  }

  setTitleWork(pathname) { // '/', '/profile', or '/work/painting'
    const frags = pathname.split('/')
    const len = frags.length
    let titleWork = 'work'
    if (len === 3 && frags[1] === 'work') {
      titleWork = frags[2]
    }
    this.titleWork = titleWork
    console.info('setTitleWork', titleWork, frags)
  }

  render() {
    console.log('App props', this.props)
    return (
      <div className="App">
        <header className="App-header">
          <div className="header-title">
            <span><NavLink to="/">Joanne Lee</NavLink></span>
          </div>
          <nav className="header-menu">
            <NavLink className="header-menu-item" activeClassName="active" to="/profile">profile</NavLink >
            <Dropdown title={this.titleWork} />
            <NavLink className="header-menu-item" activeClassName="active" to="/contact">contact</NavLink>
          </nav>
        </header>

        <TransitionGroup>
          <CSSTransition
            classNames="slide"
            key={this.props.location.key}
            timeout={timeout}>
            <main >
              <Switch location={this.props.location}>
                <Route exact path="/" component={Home} />
                <Route path="/profile" component={Profile} />
                <Route path="/work/:name" component={Work} />
                <Route path="/contact" component={Contact} />
              </Switch>
            </main>
          </CSSTransition>
        </TransitionGroup>

        <footer>
          Copyright © 2017 Joanne Lee
        </footer>
      </div >
    )
  }
}

export default withRouter(App)