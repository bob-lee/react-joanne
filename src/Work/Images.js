import React, { useReducer, useEffect, useRef } from 'react'
import Image from './Image'
import Fullscreen, { FULL1, FULL2, DEV } from './Fullscreen'

const isWindow = typeof window !== 'undefined'
if (isWindow) {
  var Scroll = require('react-scroll')
  var scroll = Scroll.animateScroll
  var Element = Scroll.Element
  var Events = Scroll.Events
}

const Images = (props) => {
  const [showIcon, lastY, image1, image2, classes1, classes2, handlersFullscreen, handlers] = useScroll(props)

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
        eId={FULL1}
        cls={classes1}
        image={image1}
        {...handlersFullscreen}>
      </Fullscreen>
      <Fullscreen
        eId={FULL2}
        cls={classes2}
        image={image2}
        {...handlersFullscreen}>
      </Fullscreen>
    </div>
  )
}

export default Images

const initialFullscreenState = {
  classes1: FULL1,
  classes2: FULL2,
  image1: null,
  image2: null,
  indexFullscreen: -1
}
const initialState = {
  showIcon: false,
  lastY: 0,
  ...initialFullscreenState
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
  } else if (action.type === 'imageFullscreen') {
    const newState = { ...state }
    if (action.image1 !== undefined) {
      newState.image1 = action.image1
    }
    if (action.image2 !== undefined) {
      newState.image2 = action.image2
    }
    if (action.classes1 !== undefined) {
      newState.classes1 = FULL1 + action.classes1
    }
    if (action.classes2 !== undefined) {
      newState.classes2 = FULL2 + action.classes2
    }
    if (action.indexFullscreen !== undefined) {
      newState.indexFullscreen = action.indexFullscreen
    }
    return newState
  } else if (action.type === 'resetFullscreen') {
    return {
      ...state,
      ...initialFullscreenState
    }
  } else if (action.type === 'classFullscreen') {
    const newState = { ...state }
    if (action.classes1 === undefined && action.classes2 === undefined) { // reset
      newState.classes1 = FULL1
      newState.classes2 = FULL2
    } else {
      if (action.classes1 !== undefined) {
        newState.classes1 = FULL1 + action.classes1
      }
      if (action.classes2 !== undefined) {
        newState.classes2 = FULL2 + action.classes2
      }
    }
    return newState
  } else {
    throw new Error(`unknown type '${action.type}'`)
  }
}

function useScroll({ list, path, hash, workOnClick, workOnLoad, DEV }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const stateRef = useRef(initialState)
  useEffect(() => {
    stateRef.current = state
  })
  const { showIcon, lastY, classes1, classes2, image1, image2, indexFullscreen } = state

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
      console.log('Images addEventListener')
      window.addEventListener('scroll', handleScroll)
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      console.log('Images removeEventListener')
      isWindow && window.removeEventListener('scroll', handleScroll)
      isWindow && window.removeEventListener('keydown', handleKeyDown)
    }
  }, [dispatch, hash])

  const hideFullscreen = () => dispatch({ type: 'resetFullscreen' })
  const prevFullscreen = () => scrollToAndFullscreen('onPrev', getPrevOrNextImage(true))
  const nextFullscreen = () => scrollToAndFullscreen('onNext', getPrevOrNextImage(false))

  const getPrevOrNextImage = (prev) => {
    try {
      const {image1, indexFullscreen} = stateRef.current
      const isFullscreen1 = image1.index === indexFullscreen
      const nextIndex = indexFullscreen + (prev ? -1 : 1)

      if ((prev && nextIndex < 0) || (!prev && nextIndex === list.length)) {
        return { img: null }
      }

      const img = indexToImage(nextIndex)

      if (DEV) console.warn(`getPrevOrNextImage [${indexFullscreen}->${nextIndex}] ${img && img.element.alt}, ${isFullscreen1}, ${prev}`)

      return { img, isFullscreen1, prev }
    } catch (e) {
      console.error('getPrevOrNextImage', e)
      return { img: null }
    }
  }

  const indexToImage = (index) => ({ element: document.querySelector(`div[data-index="${index}"] img`), index })

  const scrollTo = (to) => {
    Scroll.scroller.scrollTo(to, {
      duration: 500,
      smooth: true
    })
  }

  const scrollToAndFullscreen = (eventType, { img, isFullscreen1, prev }) => {
    if (!img || !img.element || !eventType) { return }

    scrollTo(img.element.alt)

    if (DEV) console.log(`scrollToAndFullscreen '${eventType}' [${img.index}] ${isFullscreen1}, ${prev}`)

    if (eventType === 'click') { // show first image in fullscreen
      dispatch({
        type: 'imageFullscreen',
        classes1: '',
        classes2: '',
        image1: img,
        image2: null,
        indexFullscreen: img.index
      })
    } else if (eventType === 'onPrev' || eventType === 'onNext') {
      const classExit = ' fullscreen-exit' + (prev ? ' left' : '')
      const classEnter = ' fullscreen-enter' + (prev ? ' left' : '')
      const classExitActive = ' fullscreen-exit fullscreen-exit-active' + (prev ? ' left' : '')
      const classEnterActive = ' fullscreen-enter fullscreen-enter-active' + (prev ? ' left' : '')
      const action = {
        type: 'imageFullscreen',
        classes1: isFullscreen1 ? classExit : classEnter,
        classes2: isFullscreen1 ? classEnter : classExit,
        indexFullscreen: img.index
      }
      if (isFullscreen1) {
        action.image2 = img
      } else {
        action.image1 = img
      }

      dispatch(action)
      setTimeout(() =>
        dispatch({
          type: 'classFullscreen',
          classes1: isFullscreen1 ? classExitActive : classEnterActive,
          classes2: isFullscreen1 ? classEnterActive : classExitActive
        }), 0)
    }
  }

  const handleKeyDown = (e) => {
    if (DEV) console.log(`handleKeyDown '${e.key}'`)

    if (e.key === 'Escape') {
      hideFullscreen()
    } else if (e.key === 'ArrowLeft') {
      prevFullscreen()
    } else if (e.key === 'ArrowRight') {
      nextFullscreen()
    }
  }
  
  const imagesOnClick = (eventType, me) => { // a callback for Images component to handle onClick event in Image component
    scrollToAndFullscreen(eventType, { img: me, isFullscreen1: false, prev: true })
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
    image1,
    image2,
    classes1,
    classes2,
    { // handlersFullscreen
      hideFullscreen,
      prevFullscreen,
      nextFullscreen
    },
    { // handlers
      imagesOnLoad,
      imagesOnClick
    }
  ]
}
