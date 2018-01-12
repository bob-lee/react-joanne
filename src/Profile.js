import React from 'react'
if (typeof window !== 'undefined') {
  require('./Profile.css')
}

export default class Profile extends React.Component {
  state = { 
    style: {} 
  }
  isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer:coarse)').matches

  toggleState = (event) => { // only for touch device
    const isPaused = !this.state.style.animationPlayState || this.state.style.animationPlayState === 'paused' 
    const play = isPaused ? 'running' : 'paused'
    //console.log('toggleState', play)
    this.setState({ 
      style: { animationPlayState: play } 
    })
  }

  render() {
    return (
      <div className="profile"
        style={this.state.style}
        {...this.isTouchDevice ? { onClick: this.toggleState } : {}}>
        <div className="content">
          <span>
            Hi, I am Joanne, was an illustrator for children's books in South Korea, enjoying country like lifestyle here in Wairarapa, New Zealand, love to share some of my works. Enjoy!
		      </span>
          <ul>
            <li>Illustrator at Dongsuh Publishing Company, 1986-88</li>
            <li>Personal exhibition at Seoul, 1989</li>
            <li>Freelance illustrator for children's books, magazines and postcards, 1989-99</li>
          </ul>
        </div>
      </div>
    )
  }
}