import React, { useEffect, useRef, useReducer } from 'react'
import Images from './Images'
import getUrls from './api'

if (typeof window !== 'undefined') {
  require('./intersection-observer')
  require('./Work.css')
}

const Work = (props) => {
  const list = useObserver(props/*.match.params.name*/)

  return (
    <Images {...list} {...props} />
  )
};

export default Work;

const INTERSECT_PAGESIZE = 2
const DEV = false

const initialState = {
  list: [],
  scrolling: '-',
  intersectionRatio: null,
  elementsToObserve: [null, null], // [0]=element being observed, [1]=element to observe when direction changed
  indexToObserve: null,
  intersectionObserver: null
}

function reducer(state, action) {
  if (action.type === 'intersecting') {
    return {
      ...state,
      intersectionRatio: action.intersectionRatio
    }
  } else if (action.type === 'newIndex') {
    return {
      ...state,
      list: action.list,
      scrolling: action.scrolling,
      indexToObserve: action.indexToObserve
    }
  } else if (action.type === 'observeMe') {
    const newState = {
      ...state,
      elementsToObserve: [action.me, state.elementsToObserve[1]],
      intersectionRatio: undefined
    }
    if (action.indexToObserve) { // update index
      newState.indexToObserve = action.indexToObserve
    }
    if (action.scrolling) {
      newState.scrolling = action.scrolling
    }
    return newState
  } else if (action.type === 'unobserveMe') {
    if (action.index !== state.elementsToObserve[0].index) {
      throw new Error(`unobserveMe index mismatch ${action.index} <> ${state.elementsToObserve[0].index}`)
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
    throw new Error(`unknown type '${action.type}'`)
  }
}

function useObserver(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const stateRef = useRef(initialState)
  useEffect(() => {
    stateRef.current = state
  })

  const { list, indexToObserve, intersectionObserver } = state

  const { location, match } = props
  const path = match.params.name
  const hash = location.hash && location.hash.slice(1)

  useEffect(() => {
    const handleIntersection = (entries) => {
      const entry = entries[0] // observe one element
      const currentRatio = stateRef.current.intersectionRatio
      const currentScrolling = stateRef.current.scrolling
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
        MoveIndex(currentScrolling, newScrolling) // set next index and load more images
      }
      
      //console.log(entry)
    }
    
    //  Without hash, load first #0,#1 and observe #0 at onLoad.
    //  With hash, say #5, load #4,#5,#6 and observe #5 at onLoad.
    const MoveIndex = (currentScrolling, newScrolling) => {
      const currentIndex = stateRef.current.indexToObserve
      const newIndex = currentIndex + INTERSECT_PAGESIZE * (newScrolling === 'v' ? 1 : -1)
      const len = stateRef.current.list.length

      if (DEV) {
        console.log(`MoveIndex ${currentScrolling} ${newScrolling} ${currentIndex}/${newIndex}/${len}`)
      }

      const newList = [...stateRef.current.list]

      // load more images, consider the case where next image was already loaded
      let countToLoad = 0
      let nextIndex = newIndex
      const directionChanged = currentScrolling !== '-' && currentScrolling !== newScrolling
      const me = stateRef.current.elementsToObserve[1]

      if (directionChanged && me) {
        unobserveMe(true)
        stateRef.current.intersectionObserver.observe(me.element)
        dispatch({
          type: 'observeMe',
          me: me,
          scrolling: newScrolling,
          indexToObserve: me.index
        })
        if (DEV) console.info(`observeMe [${me.index}] directionChanged`)
      } else if (stateRef.current.list.filter(e => !e.toLoad).length === 0) {
        unobserveMe(false)
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
          unobserveMe(keepElement)

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
      let initialIndexToObserve = 0
      const list = items.reverse().map((item, index) => {
        if (hash && hash === item.fileName) {
          initialIndexToObserve = index
        }
        return { toLoad: !hash && index < INTERSECT_PAGESIZE, ...item }
      })

      if (items && hash && initialIndexToObserve > 0) {
        checkIndexAndSetToLoad(initialIndexToObserve, list)
        for (let i = 1; i < INTERSECT_PAGESIZE; i++) {
          checkIndexAndSetToLoad(initialIndexToObserve - i, list)
          checkIndexAndSetToLoad(initialIndexToObserve + i, list)
        }
      }
      console.log(`applyItems: ${initialIndexToObserve}/${list.length} ${hash}`)

      dispatch({
        type: 'gotUrls',
        list: list,
        indexToObserve: initialIndexToObserve
      })
    }

    const checkIndexAndSetToLoad = (index, list) => {
      if (index >= 0 && index < list.length) {
        list[index].toLoad = true
      }
    }

    const unobserveMe = (keepElement) => { // unobserve current element
      const len = stateRef.current.elementsToObserve.length
      const me = stateRef.current.elementsToObserve[0]
      const index = stateRef.current.indexToObserve
  
      if (!me) {
        // just return
      } else if (len !== 2 || index !== me.index) {
        console.error(`wrong elementsToObserve ${index}/${me.index}/${len}`)
      } else {
        stateRef.current.intersectionObserver.unobserve(me.element)
        if (DEV) console.info(`unobserveMe [${index}]`, keepElement)
  
        dispatch({
          type: 'unobserveMe',
          index,
          keepElement
        })
      }
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
      unobserveMe(false)
    }
  }, [dispatch, hash, path])


  const observeMe = (me) => { // a callback used by Image component at onLoad event
    //console.log('observe', me)
    if (!me || !me.element || me.index === undefined) {
      console.warn(`observeMe() invalid input: ${me}`)
      return
    }

    if (me.index === indexToObserve) {
      intersectionObserver.observe(me.element)
      dispatch({
        type: 'observeMe',
        me: me
      })
      console.info(`observeMe [${me.index}]`)
    } else {
      //console.log(`observe(${me.index} !== ${indexToObserve})`)
    }
  }

  return {
    list,
    onImageLoaded: observeMe
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
