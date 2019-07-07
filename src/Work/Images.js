import React, { useReducer, useEffect } from 'react'
import Image from './Image'

const isWindow = typeof window !== 'undefined'
if (isWindow) {
  var Scroll = require('react-scroll')
  var scroll = Scroll.animateScroll
  var Element = Scroll.Element
  var Events = Scroll.Events
}

const Images = (props) => {
  const [showIcon, lastY, handlers] = useScroll(props)

  const scrollToTop = (e) => {
    e.preventDefault()
    props.workOnScrollToTop(() => scroll.scrollToTop())
  }
  const { list } = props
  const classes = showIcon ? 'back-to-top show' : 'back-to-top'
  const info = Math.ceil(lastY)

  return (
    <div>
      <div className="images">
        {list.map((item, index) =>
          <Element name={item.fileName} key={item.fileName} data-index={index}>
            <Image
              item={item}
              index={index}
              {...handlers}
            />
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

const initialState = {
  showIcon: false,
  lastY: 0
}

const currentPositionY = () => window.pageYOffset

function reducer(state, action) {
  if (action.type === 'updateLastY') {
    const newY = currentPositionY()
    return newY === state.lastY ? { ...state } : {
      ...state,
      lastY: newY,
      showIcon: newY > 500
    }
  } else {
    throw new Error(`unknown type '${action.type}'`)
  }
}

function useScroll({ path, hash, workOnClick, workOnLoad, DEV }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { showIcon, lastY } = state

  useEffect(() => {
    let ticking = false
    const handleScroll = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          dispatch({ type: 'updateLastY' })
          ticking = false
        })
        ticking = true
      }
    }
    if (isWindow) {
      console.log('addEventListener')
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      console.log('removeEventListener')
      isWindow && window.removeEventListener('scroll', handleScroll)
    }
  }, [dispatch, hash])

  const scrollTo = (to) => {
    Scroll.scroller.scrollTo(to, {
      duration: 500,
      //delay: 1500,
      smooth: true
    })
  }

  const imagesOnClick = (eventType, me) => { // a callback for Images component to handle onClick event in Image component
    scrollTo(me.element.alt)
    // needs to unobserve first and scroll then observe
    // workOnClick()
    // Events.scrollEvent.register('end', (to) => {
    //   workOnLoad(eventType, me)
    //   Events.scrollEvent.remove('end')
    //   console.log(`imagesOnClick scroll end`, to)
    // })
    // setTimeout(() => scrollTo(me.element.alt), 0)
  }

  const imagesOnLoad = (eventType, me) => { // a callback for Images component to handle onLoad event in Image component
    if (DEV) console.log(`imagesOnLoad[${me.index}]`, me.element.alt, eventType)
    if (!me || !me.element || me.index === undefined) {
      console.warn(`imagesOnLoad() invalid input: ${me}`)
      return
    }

    if (hash === me.element.alt) {
      Events.scrollEvent.register('end', (to) => {
        workOnLoad(eventType, me)
        Events.scrollEvent.remove('end')
        if (DEV) console.log(`imagesOnLoad scroll end`, to)
      })
      setTimeout(() => scrollTo(hash), 200) // need 200ms delay to paint?
    } else {
      workOnLoad(eventType, me)
    }
  }

  return [
    showIcon, 
    lastY, 
    {
      imagesOnLoad, 
      imagesOnClick
    }
  ]
}
