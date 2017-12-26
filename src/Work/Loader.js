import React from 'react'
import './Loader.css'

const Loader = (props) => {
  return (
    <div className="loader" style={props.style}>Loading...</div>
  )
}

export default Loader