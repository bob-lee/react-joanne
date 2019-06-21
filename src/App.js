import React, { useState, useEffect } from 'react';
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

const App = (props) => {
  const [titleWork, setTitleWork] = useState('work') 

  useEffect(() => {
    const pathname = props.location.pathname // '/', '/profile', or '/work/painting'
    const frags = pathname.split('/')
    const len = frags.length
    const _titleWork = (len === 3 && frags[1] === 'work') ? frags[2] : 'work'
  
    if (_titleWork !== titleWork) {
      setTitleWork(_titleWork)
      console.info('setTitleWork', _titleWork, frags)
    }
  }, [props.location.pathname, titleWork])

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-title">
          <span><NavLink to="/">Joanne Lee</NavLink></span>
        </div>
        <nav className="header-menu">
          <NavLink className="header-menu-item" activeClassName="active" to="/profile">profile</NavLink >
          <Dropdown title={titleWork} />
          <NavLink className="header-menu-item" activeClassName="active" to="/contact">contact</NavLink>
        </nav>
      </header>

      <TransitionGroup>
        <CSSTransition
          classNames="slide"
          key={props.location.key}
          timeout={timeout}>
          <main >
            <Switch location={props.location}>
              <Route exact path="/" component={Home} />
              <Route path="/profile" component={Profile} />
              <Route path="/work/:name" component={Work} />
              <Route path="/contact" component={Contact} />
            </Switch>
          </main>
        </CSSTransition>
      </TransitionGroup>

      <footer>
        Copyright © Joanne Lee
      </footer>
    </div >
  )  
}

export default withRouter(App)