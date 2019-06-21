import React, { useState, useEffect } from 'react'
import Image from './Image'

const isWindow = typeof window !== 'undefined'
if (isWindow) {
  var scroll = require('react-scroll').animateScroll
}

const Images = (props) => {
  const [showIcon, lastY] = useScroll()

  const scrollToTop = () => scroll.scrollToTop()
  const { list, ...propsButList } = props
  const classes = showIcon ? 'back-to-top show' : 'back-to-top'
  const info = Math.ceil(lastY)

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
      <div className={classes} onClick={scrollToTop}>
        <i className="fa fa-step-forward fa-lg" aria-hidden="true"></i>
      </div>
      <div className="back-to-top test">
        {info}
      </div>
    </div>
  )
}

export default Images

function useScroll() {
  const [showIcon, setShowIcon] = useState(false)
  const [lastY, setLastY] = useState(0)
  const [ticking, setTicking] = useState(false)

  useEffect(() => {
    console.log('addEventListener')
    const currentPositionY = () => window.pageYOffset
    const updateLastY = () => {
      const newY = currentPositionY()
      if (newY !== lastY) {
        setLastY(newY)
        setShowIcon(isWindow && newY > 500)
      }
    }
    const handleScroll = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateLastY()
          setTicking(false)
        })
        setTicking(true)
      }
    }

    isWindow && window.addEventListener('scroll', handleScroll)
    return () => { console.log('removeEventListener'); isWindow && window.removeEventListener('scroll', handleScroll) }
  }, [])

  return [showIcon, lastY]
}
