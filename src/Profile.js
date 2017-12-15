import React from 'react'
import './Profile.css'

export default class Profile extends React.Component {
  state = { play: 'paused' }
  isTouchDevice = window.matchMedia('(pointer:coarse)').matches

  toggleState = (event) => { // only for touch device
    const play = this.state.play === 'paused' ? 'running' : 'paused'
    console.log('toggleState', play)
    this.setState({ play: play })
    this.profile.style.animationPlayState = play
  }

  render() {
    return (
      <div className="profile"
        ref={(input) => { this.profile = input; }}
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