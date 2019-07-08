import React, { useEffect, useRef, useReducer } from 'react'
import Images from './Images'
import getUrls from './api'

if (typeof window !== 'undefined') {
  require('./intersection-observer')
  require('./Work.css')
}

const Work = ({ location, match, ...propsForImages }) => {
  const additionalProps = useObserver(location, match)

  return (
    <Images {...propsForImages} {...additionalProps} />
  )
}

export default Work

const INTERSECT_PAGESIZE = 2
const DEV = false

const initialState = {
  list: [],
  scrolling: '-', // 'v': scrolling down, '^': scrolling up
  intersectionRatio: null,
  elementsToObserve: [null, null], // [0]=element being observed, [1]=element to observe when direction changed
  indexToObserve: null, // index of element being observed or to observe soon
  intersectionObserver: null // instance of observer
}

function reducer(state, action) {
  if (action.type === 'intersecting') {
    return {
      ...state,
      intersectionRatio: action.intersectionRatio
    }
  } else if (action.type === 'newIndex') {
    const newState = {
      ...state,
      list: action.list,
      scrolling: action.scrolling,
      indexToObserve: action.indexToObserve
    }
    if (newState.indexToObserve === 0) { // most likely scroll-to-top, erase [1] if any
      newState.elementsToObserve[1] = null
    }
    return newState
  } else if (action.type === 'observeMe') {
    const newState = {
      ...state,
      elementsToObserve: [action.me, state.elementsToObserve[1]],
      intersectionRatio: undefined
    }
    if (action.indexToObserve !== undefined) { // update index
      newState.indexToObserve = action.indexToObserve
    }
    if (action.scrolling) {
      newState.scrolling = action.scrolling
    }
    return newState
  } else if (action.type === 'unobserveMe') {
    if (action.index !== state.elementsToObserve[0].index) {
      throw new Error(`reducer(unobserveMe) index mismatch ${action.index} <> ${state.elementsToObserve[0].index}`)
    }

    return {
      ...state,
      elementsToObserve: [null, action.keepElement ? state.elementsToObserve[0] : state.elementsToObserve[1]],
      intersectionRatio: undefined
    }
  } else if (action.type === 'observerCreated') {
    return {
      ...state,
      intersectionObserver: action.intersectionObserver
    }
  } else if (action.type === 'gotUrls') {
    return {
      ...state,
      list: action.list,
      indexToObserve: action.indexToObserve
    }
  } else {
    throw new Error(`reducer(${action.type}) unknown type`)
  }
}

function useObserver(location, match) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const stateRef = useRef(initialState)
  useEffect(() => {
    stateRef.current = state
  })

  const { list, indexToObserve, elementsToObserve, intersectionObserver } = state
  const path = match.params.name
  const hash = location.hash && location.hash.slice(1)

  useEffect(() => {
    const handleIntersection = (entries) => {
      const entry = entries[0] // observe one element
      const currentScrolling = stateRef.current.scrolling
      const currentRatio = stateRef.current.intersectionRatio
      const newRatio = entry.intersectionRatio
      const boundingClientRect = entry.boundingClientRect
      const ratioChanged = currentRatio !== undefined && newRatio < currentRatio
      const scrollingDown = ratioChanged && boundingClientRect.bottom < boundingClientRect.height
      const scrollingUp = ratioChanged && boundingClientRect.bottom > boundingClientRect.height
      const newScrolling = scrollingDown ? 'v' : scrollingUp ? '^' : '-'

      dispatch({
        type: 'intersecting',
        intersectionRatio: newRatio
      })

      /*
height:${Math.ceil(boundingClientRect.height)}, bottom:${Math.ceil(boundingClientRect.bottom)}, \
      */
      if (DEV) {
        console.log(`scrolling: ${entries.length}, ${currentScrolling} ${newScrolling}, \
[${show(stateRef.current.elementsToObserve)}], ${stateRef.current.indexToObserve}, \
${entry.target.alt}, ${entry.isIntersecting}, \
ratio:${roundUp(currentRatio, 3)}->${roundUp(newRatio, 3)}`)
      }

      if (scrollingDown || scrollingUp) {
        // it's scrolling and observed image started to hide.
        // so unobserve it and load more images.
        MoveIndex(currentScrolling, newScrolling)
      }

      //console.log(entry)
    }

    //  Without hash, load first #0,#1 and observe #0 at onLoad.
    //  With hash, say #5, load #4,#5,#6 and observe #5 at onLoad.
    const MoveIndex = (currentScrolling, newScrolling) => {
      const currentIndex = stateRef.current.indexToObserve
      const newIndex = currentIndex + INTERSECT_PAGESIZE * (newScrolling === 'v' ? 1 : -1)
      const len = stateRef.current.list.length

      if (DEV) console.log(`MoveIndex ${currentScrolling} ${newScrolling} ${currentIndex}/${newIndex}/${len}`)

      const newList = [...stateRef.current.list]

      // load more images, consider the case where next image was already loaded
      let countToLoad = 0
      let nextIndex = newIndex
      const directionChanged = currentScrolling !== '-' && currentScrolling !== newScrolling
      const me = stateRef.current.elementsToObserve[1]

      if (directionChanged && me) {
        unobserve(true)
        stateRef.current.intersectionObserver.observe(me.element)
        dispatch({
          type: 'observeMe',
          me: me,
          scrolling: newScrolling,
          indexToObserve: me.index
        })
        if (DEV) console.info(`observeMe [${me.index}] directionChanged`)
      } else if (stateRef.current.list.filter(e => !e.toLoad).length === 0) {
        unobserve(false)
        if (DEV) console.info('no more items to load')
      } else {
        for (let i = 0; countToLoad < INTERSECT_PAGESIZE; i++) {
          const next = newIndex + i * (newScrolling === 'v' ? 1 : -1)
          if ((newScrolling === 'v' && next >= len) || (newScrolling === '^' && next < 0)) {
            break // reached the end
          }

          if (DEV) console.log(`[${next}] ${Number(newList[next].toLoad)}`)
          if (!newList[next].toLoad) {
            newList[next].toLoad = true
            countToLoad++
            if (countToLoad === 1) {
              nextIndex = next;
            }
          }
        }

        if (countToLoad) {
          const keepElement = (currentScrolling === '-' && hash) || directionChanged ? true : false
          unobserve(keepElement)

          dispatch({
            type: 'newIndex',
            list: newList,
            scrolling: newScrolling,
            indexToObserve: nextIndex
          })
        }
      }
    }

    const fetchUrls = (path, hash) => {
      if (window.SERVER_DATA) {
        applyItems(hash)(window.SERVER_DATA)
        window.SERVER_DATA = null
      } else {
        getUrls(path).then(applyItems(hash))
        //.catch(error => console.error('getUrls:', error))
      }
    }

    const applyItems = (hash) => (items) => {
      let initialIndex = 0
      const list = items.reverse().map((item, index) => {
        if (hash && hash === item.fileName) {
          initialIndex = index
        }
        return { toLoad: !hash && index < INTERSECT_PAGESIZE, ...item }
      })

      if (items && hash && initialIndex > 0) {
        checkIndexAndSetToLoad(initialIndex, list)
        for (let i = 1; i < INTERSECT_PAGESIZE; i++) {
          checkIndexAndSetToLoad(initialIndex - i, list)
          checkIndexAndSetToLoad(initialIndex + i, list)
        }
      }
      console.info(`applyItems: ${initialIndex}/${list.length} ${hash}`)

      dispatch({
        type: 'gotUrls',
        list: list,
        indexToObserve: initialIndex
      })
    }

    const checkIndexAndSetToLoad = (index, list) => {
      if (index >= 0 && index < list.length) {
        list[index].toLoad = true
      }
    }

    const unobserve = (keepElement) => { // unobserve current element
      const me = stateRef.current.elementsToObserve[0]
      const index = stateRef.current.indexToObserve
      unobserveMe(me, index, stateRef.current.intersectionObserver, keepElement)
    }

    if (typeof window !== 'undefined') {
      try {
        const intersectionObserver = new IntersectionObserver(handleIntersection, { threshold: [0, 0.25, 0.5, 0.75, 1] })
        dispatch({
          type: 'observerCreated',
          intersectionObserver: intersectionObserver
        })
      } catch (e) {
        console.error('failed to create IntersectionObserver:', e)
      }
    }

    if (DEV) console.warn(`useObserver fetchUrls '${path}' '${hash}'`, stateRef.current.list.length)
    fetchUrls(path, hash)

    return () => { // clear effect
      if (DEV) console.warn('useObserver clear')
      unobserve(false)
    }
  }, [dispatch, hash, path])

  const observeMe = (eventType, me) => { // a callback for Work component to handle onLoad event in Image component
    if (eventType === 'click') {
      intersectionObserver.observe(me.element)
      dispatch({
        type: 'observeMe',
        me: me,
        scrolling: '-', // ???
        indexToObserve: me.index
      })
    } else if (eventType === 'load' && me.index === indexToObserve) {
      intersectionObserver.observe(me.element)
      dispatch({
        type: 'observeMe',
        me: me
      })
    } else {
      return
      //console.log(`observe(${me.index} !== ${indexToObserve})`)
    }

    if (DEV) console.info(`observeMe [${me.index}]`, eventType)
  }

  const unobserveMe = (me, index, observer, keepElement) => {
    if (!me) {
      // just return
    } else if (index !== me.index) {
      console.error(`unobserveMe got wrong elementsToObserve ${index}/${me.index}`)
    } else {
      observer.unobserve(me.element)
      
      if (DEV) console.info(`unobserveMe [${index}]`, keepElement)

      dispatch({
        type: 'unobserveMe',
        index,
        keepElement
      })
    }
  }

  const workOnScrollToTop = (done) => {
    // unobserve
    workOnClick()

    // load if needed, observe if needed
    const newList = [...list]

    let countToLoad = 0
    for (let i = 0; i < INTERSECT_PAGESIZE; i++) {
      if (!newList[i].toLoad) {
        newList[i].toLoad = true
        countToLoad++
      }
    }
    if (countToLoad) {
      dispatch({
        type: 'newIndex',
        list: newList,
        scrolling: '^',
        indexToObserve: 0
      })
      
      if (DEV) console.log(`workOnScrollToTop to load ${countToLoad} image(s)`)
    } else {
      const target = document.querySelector(`div[data-index="0"] img`)
      intersectionObserver.observe(target)
      dispatch({
        type: 'observeMe',
        me: {
          element: target,
          index: 0
        },
        scrolling: '^',
        indexToObserve: 0
      })
      
      if (DEV) console.log(`workOnScrollToTop to observe`, target.alt)
    }

    // scroll to top
    done()
  }


  const workOnClick = () => {
    unobserveMe(elementsToObserve[0], indexToObserve, intersectionObserver, false)
  }

  return {
    list,
    workOnScrollToTop,
    workOnClick,
    workOnLoad: observeMe,
    path,
    hash,
    DEV
  }
}

// below only for debug
function roundUp(num, precision) {
  if (!num) { return num }
  precision = Math.pow(10, precision)
  return Math.ceil(num * precision) / precision
}
function show(list) {
  return (list[0] ? list[0].index : 'null') + ',' + (list[1] ? list[1].index : 'null')
}
