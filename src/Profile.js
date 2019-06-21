import React, {useState} from 'react'
if (typeof window !== 'undefined') {
  require('./Profile.css')
}

const Profile = (props) => {
  const style = useStyle()

  return (
    <div className="profile" {...style}>
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

export default Profile

const useStyle = () => {
  const [style, setStyle] = useState({})

  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer:coarse)').matches
  const toggleState = (event) => { // only for touch device
    const isPaused = !style.animationPlayState || style.animationPlayState === 'paused' 
    const play = isPaused ? 'running' : 'paused'
    //console.log('toggleState', play)
    setStyle({ animationPlayState: play })
  }

  const returnObject = {style}
  if (isTouchDevice) {
    returnObject['onClick'] = toggleState
  }

  return returnObject

  // return {
  //   style,
  //   onClick: isTouchDevice ? toggleState: null
  // }
}
