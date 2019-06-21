import React, { useState, useEffect, useRef } from 'react'
import Images from './Images'
import getUrls from './api'

if (typeof window !== 'undefined') {
  require('./intersection-observer')
  require('./Work.css')
}

const Work = (props) => {
  const list = useObserver(props.match.params.name)

  return (
    <Images {...list} {...props} />
  )
};

export default Work;

const INTERSECT_PAGESIZE = 2

function useObserver(path) {
  const [list, setList] = useState([])
  const [intersectionRatio, setIntersectionRatio] = useState(null) // 1: fully shown, 0.5: half shown, ..
  const [elementToObserve, setElementToObserve] = useState(null) // img tag being observed
  const [indexToObserve, setIndexToObserve] = useState(null) // index of img tag being observed
  const [intersectionObserver, setIntersectionObserver] = useState(null) // instance of observer

  const listRef = useRef([])
  const intersectionRatioRef = useRef(null)
  const indexToObserveRef = useRef(null)
  const elementToObserveRef = useRef(null)
  const intersectionObserverRef = useRef(null)

  useEffect(() => {
    listRef.current = list
    intersectionRatioRef.current = intersectionRatio
    indexToObserveRef.current = indexToObserve
    elementToObserveRef.current = elementToObserve
    intersectionObserverRef.current = intersectionObserver
  })

  useEffect(() => {
    const handleIntersection = (entries) => {
      const entry = entries[0] // observe one element
      const currentRatio = intersectionRatioRef.current
      const newRatio = entry.intersectionRatio
      const boundingClientRect = entry.boundingClientRect
      const scrollingDown = currentRatio !== undefined && newRatio < currentRatio &&
        boundingClientRect.bottom < boundingClientRect.height

      setIntersectionRatio(newRatio)

      //console.log('handleIntersection', listRef.current.length, scrollingDown, currentRatio, newRatio)
      if (scrollingDown) {
        // it's scrolling down and observed image started to hide.
        // so unobserve it and start loading next images.
        const i = indexToObserveRef.current + INTERSECT_PAGESIZE
        unobserve()
        TouchIndexToObserve(i) // set next index and load two more images
        //console.info(currentRatio + ' -> ' + newRatio + ' [' + i + ']')
      }

      //console.log(entry)
    }

    try {
      const _intersectionObserver = typeof window !== 'undefined' &&
        new IntersectionObserver(handleIntersection, { threshold: [0, 0.25, 0.5, 0.75, 1] })
      setIntersectionObserver(_intersectionObserver)
    } catch (e) {
      console.error('failed to create IntersectionObserver:', e)
    }

    console.warn(`useObserver fetchUrls '${path}'`)
    fetchUrls(path)
    return () => {
      console.warn('useObserver unobserve')
      unobserve()
    }
  }, [])

  const TouchIndexToObserve = (value) => {
    const len = listRef.current.length
    const newList = [...listRef.current]

    //console.log('TouchIndexToObserve', len, value, indexToObserveRef.current)
    if (indexToObserveRef.current &&
      (!value || value <= indexToObserveRef.current || value >= len)) {
      console.error('TouchIndexToObserve', value)
      return
    }

    setIndexToObserve(value)

    // load more images
    let countToLoad = 0
    for (let i = 0; i < INTERSECT_PAGESIZE; i++) {
      const index = value + i
      if (index === len) {
        break // reached page end 
      }

      newList[index].toLoad = true
      countToLoad++
      console.log('[' + index + ']')
    }

    if (countToLoad) {
      setList(newList)
    }
  }

  const fetchUrls = (path) => {
    //this.unobserve()
    if (window.SERVER_DATA) {
      itemsWithToLoad(window.SERVER_DATA)
      window.SERVER_DATA = null
    } else {
      getUrls(path).then(itemsWithToLoad)
      //.catch(error => console.error('getUrls:', error))
    }
  }

  const itemsWithToLoad = (items) => {
    const _list = items.reverse().map((item, index) => (
      { toLoad: index < 2, ...item }
    ))
    console.log('itemsWithToLoad:', _list.length)
    setIndexToObserve(0)
    setList(_list)

    //window.scrollTo(0, 0)
  }

  const observe = me => {
    //console.log('observe', me)
    if (!me || !me.element || me.index === undefined) {
      console.warn(`observe() invalid input: ${me}`)
      return
    }

    if (me.index === indexToObserve) {
      setElementToObserve(me.element)
      intersectionObserver.observe(me.element)
      //console.info(`elementToObserve = ${me.index}`)
    } else {
      //console.log(`observe(${me.index} !== ${indexToObserve})`)
    }
  }

  const unobserve = () => { // unobserve current element
    if (elementToObserveRef.current) {
      intersectionObserverRef.current.unobserve(elementToObserveRef.current)
      setIntersectionRatio(undefined)
      //console.info(`unobserve [${indexToObserveRef.current}]`)
    } else {
      console.error(`null elementToObserve`)
    }
  }

  return {
    list,
    onImageLoaded: observe
  }
}
