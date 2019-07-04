import React, { useState, useEffect } from 'react'
import Image from './Image'

const isWindow = typeof window !== 'undefined'
if (isWindow) {
  var Scroll = require('react-scroll')
  var scroll = Scroll.animateScroll
  var Element = Scroll.Element
}

const Images = (props) => {
  const [showIcon, lastY] = useScroll(props)

  const scrollToTop = () => scroll.scrollToTop()
  const { list, ...propsButList } = props
  const classes = showIcon ? 'back-to-top show' : 'back-to-top'
  const info = Math.ceil(lastY)

  return (
    <div>
      <div className="images">
        {list.map((item, index) =>
          <Element name={item.fileName} key={item.fileName}>
            <Image 
              item={item}
              index={index}
              {...propsButList} />
          </Element>
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

function useScroll(props) {
  const [showIcon, setShowIcon] = useState(false)
  const [lastY, setLastY] = useState(0)
  const [ticking, setTicking] = useState(false)

  useEffect(() => {
    console.log('addEventListener')
    //console.log('addEventListener, router props:', props)
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
    const scrollTo = (hash) => {
      console.log('scrollTo', hash)
      Scroll.scroller.scrollTo(hash, {
        duration: 500,
        //delay: 1500,
        smooth: true
      })
    }
    if (isWindow) {
      window.addEventListener('scroll', handleScroll)
      const hash = props.location && props.location.hash.slice(1)
      if (hash) {
        setTimeout(() => {
          scrollTo(hash)
        }, 1000);
      }
    }

    return () => { console.log('removeEventListener'); isWindow && window.removeEventListener('scroll', handleScroll) }
  }, [props.location])

  return [showIcon, lastY]
}
