import React, { useReducer, useEffect } from 'react'
import Image from './Image'
import Fullscreen from './Fullscreen'
import './Images.css'

const isWindow = typeof window !== 'undefined'
if (isWindow) {
  var Scroll = require('react-scroll')
  var scroll = Scroll.animateScroll
  var Element = Scroll.Element
  var Events = Scroll.Events
}

const Images = (props) => {
  const [showIcon, lastY, imageFullscreen, showFullscreen, hideFullscreen, prevFullscreen, nextFullscreen, handlers] = useScroll(props)

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
      <Fullscreen 
        img={imageFullscreen} 
        toShow={showFullscreen} 
        onExit={hideFullscreen}
        onPrev={prevFullscreen}
        onNext={nextFullscreen}>
      </Fullscreen>
    </div>
  )
}

export default Images

const initialState = {
  showIcon: false,
  lastY: 0,
  showFullscreen: false,
  imageFullscreen: null
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
  } else if (action.type === 'fullscreen') {
    if (!action.imageFullscreen) { return state }
    return {
      ...state,
      showFullscreen: true,
      imageFullscreen: action.imageFullscreen
    }
  } else if (action.type === 'showFullscreen') {
    return {
      ...state,
      showFullscreen: action.showFullscreen
    }
  } else {
    throw new Error(`unknown type '${action.type}'`)
  }
}

function useScroll({ list, path, hash, workOnClick, workOnLoad, DEV }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { showIcon, imageFullscreen, showFullscreen, lastY } = state

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

  const setImageFullscreen = (img) => dispatch({ type: 'fullscreen', imageFullscreen: img })
  const setShowFullscreen = (toShow) => dispatch({ type: 'showFullscreen', showFullscreen: toShow })
  const hideFullscreen = () => setShowFullscreen(false)
  const prevFullscreen = () => scrollToAndFullscreen(getImage(true))
  const nextFullscreen = () => scrollToAndFullscreen(getImage(false))

  const getImage = (prev) => {
    try {
      // get current index
      let currentIndex = 0
      if (imageFullscreen) {
        const div = document.querySelector(`div[name="${imageFullscreen.alt}"]`)
        currentIndex = Number(div.dataset.index)
        console.log(`getImage currentIndex ${currentIndex}/${list.length}`, prev)
      }
      if (prev && currentIndex === 0 || !prev && currentIndex === (list.length - 1)) { return null }
      currentIndex = currentIndex + 1 * (prev ? -1 : 1)

      const img = document.querySelector(`div[data-index="${currentIndex}"] img`)
      console.log(`getImage ${currentIndex}`, img && img.alt)
      return img
    } catch (e) {
      console.error('getImage', e)
      return null
    }
  }

  const scrollTo = (to) => {
    Scroll.scroller.scrollTo(to, {
      duration: 500,
      //delay: 1500,
      smooth: true
    })
  }

  const scrollToAndFullscreen = (img) => {
    if (!img) { return }

    scrollTo(img.alt)

    if (!imageFullscreen || imageFullscreen.alt !== img.alt) {
      setImageFullscreen(img)
    } else {
      setShowFullscreen(true)
    }
  }

  const imagesOnClick = (eventType, me) => { // a callback for Images component to handle onClick event in Image component
    scrollToAndFullscreen(me.element)
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
    imageFullscreen,
    showFullscreen,
    hideFullscreen,
    prevFullscreen,
    nextFullscreen,
    {
      imagesOnLoad,
      imagesOnClick
    }
  ]
}
