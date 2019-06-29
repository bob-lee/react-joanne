import React, { useState, useEffect, useRef } from 'react'
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

function useObserver(props) {
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

  const { location, match } = props
  const path = match.params.name
  const hash = location.hash && location.hash.slice(1)

  useEffect(() => {
    const handleIntersection = (entries) => {
      const entry = entries[0] // observe one element
      const currentRatio = intersectionRatioRef.current
      const newRatio = entry.intersectionRatio
      const boundingClientRect = entry.boundingClientRect
      const scrolling = currentRatio !== undefined && newRatio < currentRatio
      const scrollingDown = scrolling && boundingClientRect.bottom < boundingClientRect.height
      const scrollingUp = scrolling && boundingClientRect.bottom > boundingClientRect.height

      setIntersectionRatio(newRatio)

      console.log(`handleIntersection ${scrollingDown ? 'v' : scrollingUp ? '^' : '-'} ratio:${roundUp(currentRatio,2)}->${roundUp(newRatio,2)} height:${Math.ceil(boundingClientRect.height)} bottom:${Math.ceil(boundingClientRect.bottom)}`, entry.target.alt)
      if (scrollingDown || scrollingUp) {
        unobserve()
        // it's scrolling down and observed image started to hide.
        // so unobserve it and start loading next images.
        const newIndex = indexToObserveRef.current + INTERSECT_PAGESIZE * (scrollingDown ? 1 : -1)
        AdvanceIndexToObserve(newIndex, scrollingDown) // set next index and load more images
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

    console.warn(`useObserver fetchUrls '${path}' '${hash}'`)
    fetchUrls(path, hash)
    return () => {
      console.warn('useObserver unobserve')
      unobserve()
    }
  }, [])

  const AdvanceIndexToObserve = (newIndex, scrollingDown) => {
    const currentndex = indexToObserveRef.current
    const len = listRef.current.length
    console.log(`AdvanceIndexToObserve ${scrollingDown ? 'v' : '^'} ${currentndex}/${newIndex}/${len}`)

    const newList = [...listRef.current]

    // load more images, consider the case where next image was already loaded
    let countToLoad = 0
    for (let i = 0; countToLoad < INTERSECT_PAGESIZE; i++) {
      const next = newIndex + i * (scrollingDown ? 1 : -1)
      if ((scrollingDown && next >= len) || (!scrollingDown && next < 0)) {
        break // reached the end 
      }

      console.log(`[${next}] ${Number(newList[next].toLoad)}`)
      if (!newList[next].toLoad) {
        newList[next].toLoad = true
        countToLoad++
      }
    }
/*
    for (let i = 0; i < INTERSECT_PAGESIZE; i++) {
      const index = newIndex + i * (scrollingDown ? 1 : -1)
      if ((scrollingDown && index === len) || (!scrollingDown && index < 0)) {
        break // reached page end 
      }

      if (!newList[index].toLoad) {
        newList[index].toLoad = true
        countToLoad++
        console.log(`[${index}]`)
      }
    }
*/
    if (countToLoad) {
      setIndexToObserve(newIndex)
      setList(newList)
    }
  }

  const fetchUrls = (path, hash) => {
    //this.unobserve()
    if (window.SERVER_DATA) {
      applyItems(hash)(window.SERVER_DATA)
      window.SERVER_DATA = null
    } else {
      getUrls(path).then(applyItems(hash))
      //.catch(error => console.error('getUrls:', error))
    }
  }

  /*  Without hash, load first #0,#1 and observe #0 at onLoad.
      With hash, say #5, load #4,#5,#6 and observe #5 at onLoad. 
  */
   const applyItems = (hash) => (items) => { 
    let initialIndexToObserve = 0
    const _list = items.reverse().map((item, index) => {
      if (hash && hash === item.fileName) {
        initialIndexToObserve = index
      }
      return { toLoad: !hash && index < INTERSECT_PAGESIZE, ...item }
    })

    if (items && hash && initialIndexToObserve > 0) {
      checkIndexAndSetToLoad(initialIndexToObserve, _list)
      for (let i = 1; i < INTERSECT_PAGESIZE; i++) {
        checkIndexAndSetToLoad(initialIndexToObserve - i, _list)
        checkIndexAndSetToLoad(initialIndexToObserve + i, _list)
      }
    }
    console.log(`applyItems: ${initialIndexToObserve}/${_list.length} ${hash}`)
    setIndexToObserve(initialIndexToObserve)
    setList(_list)
  }

  const checkIndexAndSetToLoad = (index, list) => {
    if (index >= 0 && index < list.length) {
      list[index].toLoad = true
    }
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
      console.info(`observe [${me.index}]`)
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

function roundUp(num, precision) {
  if (!num) { return num }
  precision = Math.pow(10, precision)
  return Math.ceil(num * precision) / precision
}