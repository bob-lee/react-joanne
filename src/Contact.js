import React from 'react'
import './Contact.css'

const Contact = () => {
  const isTouchDevice = window.matchMedia('(pointer:coarse)').matches
  return (
    <div className="contact">
      <div className="content">
        <p>
          Are you interested in having your own portrait or have any enquiry?
        </p>
        <p>
          Please send me an email:
        </p>
        <a href="mailto:joannelee133@gmail.com">
          <i className="fa fa-envelope" aria-hidden="true"></i>
          joannelee133@gmail.com
        </a>
        <p>
          or drop me a call:
        </p>
        <a {...isTouchDevice ? {href: 'tel:+64277564652'} : {}}>
          <i className="fa fa-phone" aria-hidden="true"></i>
          +64 027 756 4652
        </a>
      </div>
    </div>
  )
}

export default Contact