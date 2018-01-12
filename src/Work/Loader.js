import React from 'react'
if (typeof window !== 'undefined') {
  require('./Loader.css')
}

const Loader = (props) => {
  return (
    <div className="loader" style={props.style}>Loading...</div>
  )
}

export default Loader