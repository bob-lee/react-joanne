import React from 'react'
import Image from './Image'

const isWindow = typeof window !== 'undefined'
if (isWindow) {
  var scroll = require('react-scroll').animateScroll
}

class Images extends React.Component {
  state = { showIcon: false }
  lastY = 0
  ticking = false

  scrollToTop = () => scroll.scrollToTop()
  currentPositionY = () => window.pageYOffset

  updateLastY() {
    const newY = this.currentPositionY()
    if (newY !== this.lastY) {
      this.lastY = newY
      this.setState({
        showIcon: isWindow && this.lastY > 500
      })
      //console.log('updateLastY', Math.ceil(newY))
    }
  }

  handleScroll = (e) => {
    if(!this.ticking) {
      window.requestAnimationFrame(() => {
        this.updateLastY()
        this.ticking = false
      })
      this.ticking = true
    }
  }

  componentDidMount() {
    isWindow && window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    isWindow && window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const { list, ...propsButList } = this.props
    const classes = `back-to-top ${this.state.showIcon ? 'show' : ''}`
    const info = Math.ceil(this.lastY)

    return (
      <div>
        <div className="images">
          {list.map((item, index) =>
            <Image key={item.fileName}
              item={item}
              index={index}
              {...propsButList} />
          )}
        </div>
        <div className={classes} onClick={this.scrollToTop}>
          <i className="fa fa-step-forward fa-lg" aria-hidden="true"></i>
        </div>
        <div className="back-to-top test">
          {info}
        </div>
      </div>
    )
  }
}

export default Images
