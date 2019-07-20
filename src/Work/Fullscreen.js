import React, { useEffect, useState } from 'react'

const isWindow = typeof window !== 'undefined'
if (isWindow) {
  require('./Fullscreen.css')
}
export const FULL1 = 'fullscreen1'
export const FULL2 = 'fullscreen2'
const DEV = false

const Fullscreen = ({ eId, cls, image, hideFullscreen, prevFullscreen, nextFullscreen }) => {
  const [showExit, setShowExit] = useState(false)
  const isTouchDevice = isWindow && window.matchMedia('(pointer:coarse)').matches

  useEffect(() => {
    let fileNameDrawn = ''

    const drawImage = (img) => {
      const query = `div#fullscreen.${eId === FULL1 ? FULL1 : FULL2} canvas` 
      const canvas = document.querySelector(query)
      if (!img || !(img instanceof HTMLImageElement) || !canvas || !(canvas instanceof HTMLCanvasElement)) {
        console.warn(`${eId} drawImage '${query}'`, img, canvas)
        return
      }

      const ctx = canvas.getContext('2d');
      const scaled = getFullscreenSize(img.naturalWidth, img.naturalHeight)

      canvas.width = scaled.width
      canvas.height = scaled.height
      ctx.drawImage(img, 0, 0, scaled.width, scaled.height)
    }

    const getFullscreenSize = (sWidth, sHeight) => {
      const cWidth = document.documentElement.clientWidth
      const cHeight = document.documentElement.clientHeight
      if (DEV) console.log(`source(${sWidth} x ${sHeight})`)
      if (DEV) console.log(`client(${cWidth} x ${cHeight})`)

      let scaledWidth = scale(sWidth, sHeight, cWidth, cHeight, true)
      let scaledHeight = scale(sWidth, sHeight, cWidth, cHeight, false)

      let preferedScaled = scaledHeight
      let preferredWidth = false
      if (Math.abs(scaledWidth.overflow) < Math.abs(scaledHeight.overflow)) {
        preferedScaled = scaledWidth
        preferredWidth = true
      }

      if (DEV) console.log(`scaled once`, preferredWidth)
      let result = null

      if (cWidth >= preferedScaled.width && cHeight >= preferedScaled.height) {
        // got result
      } else { // scale once more
        if (cWidth < preferedScaled.width) {
          preferredWidth = false
          result = scale(preferedScaled.width, preferedScaled.height, cWidth, cHeight, preferredWidth)
        } else if (cHeight < preferedScaled.height) {
          preferredWidth = true
          result = scale(preferedScaled.width, preferedScaled.height, cWidth, cHeight, preferredWidth)
        }
      }

      if (result) {
        if (DEV) console.log(`scaled twice`, preferredWidth)
      } else {
        result = preferedScaled
      }
      logScale(result, preferedScaled)

      return result ? {
        width: result.width,
        height: result.height
      } : null
    }

    const scale = (wS, hS, wC, hC, scaleWidth) => {
      let overflow = 0
      let width = 0
      let height = 0
      if (scaleWidth) {
        const scaled = Math.floor(wS * hC / hS)
        overflow = (scaled - wC) * hC
        width = scaled
        height = hC
      } else {
        const scaled = Math.floor(hS * wC / wS)
        overflow = (scaled - hC) * wC
        width = wC
        height = scaled
      }

      const result = { width, height, overflow }
      logScale(result, scaleWidth)
      return result
    }

    const logScale = (scaled, scaleWidth) => DEV && console.log(`scaled${scaleWidth ? 'Width' : 'Height'}(${scaled.width} x ${scaled.height})`, scaled.overflow)

    let x0 = null
    const unify = (e) => e.changedTouches ? e.changedTouches[0] : e
    const locked = () => x0 || x0 === 0 ? true : false
    const handleTouchStart = (e) => {
      x0 = unify(e).clientX
    }
    const handleTouchEnd = (e) => {
      if (locked()) {
        const dx = x0 - unify(e).clientX
        if (Math.abs(dx) > 100) {
          (dx > 0 ? nextFullscreen : prevFullscreen)()
          if (DEV) console.log('swipe', dx, isTouchDevice)
        }
        x0 = null
      }
    }
    
    if (isWindow) {
      if (DEV) console.log(`${eId} addEventListener`)
      window.addEventListener('mousedown', handleTouchStart)
      window.addEventListener('touchstart', handleTouchStart)
      window.addEventListener('mouseup', handleTouchEnd)
      window.addEventListener('touchend', handleTouchEnd)
    }
    if (image && image.element && image.element instanceof HTMLImageElement) {
      if (!fileNameDrawn || fileNameDrawn !== image.element.alt) {
        drawImage(image.element)
        fileNameDrawn = image.element.alt
      }
    }

    if (DEV) console.log(`${eId} [${image && image.index}] ${fileNameDrawn}, ${isTouchDevice}, ${cls.length}`)

    return () => { // clean effect
      if (DEV) console.log(`${eId} removeEventListener`)
      if (isWindow) {
        window.removeEventListener('mousedown', handleTouchStart)
        window.removeEventListener('touchstart', handleTouchStart)
        window.removeEventListener('mouseup', handleTouchEnd)
        window.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [image, eId])

  const showExitIcon = () => {
    setShowExit(true)
    setTimeout(() => {
      setShowExit(false)
    }, 2000);
  }

  const classes = []
  if (cls) { classes.push(cls) }
  if (isTouchDevice) { classes.push('touchDevice') }
  if (image) { classes.push('show') }
  const classString = classes.join(' ')
  const classesExit = showExit ? 'exit show' : 'exit'

  return (
    <div id="fullscreen" className={classString}>
      <i className={classesExit} onClick={hideFullscreen}>
        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="window-close" className="svg-inline--fa fa-window-close fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="currentColor" d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h404c3.3 0 6 2.7 6 6v340zM356.5 194.6L295.1 256l61.4 61.4c4.6 4.6 4.6 12.1 0 16.8l-22.3 22.3c-4.6 4.6-12.1 4.6-16.8 0L256 295.1l-61.4 61.4c-4.6 4.6-12.1 4.6-16.8 0l-22.3-22.3c-4.6-4.6-4.6-12.1 0-16.8l61.4-61.4-61.4-61.4c-4.6-4.6-4.6-12.1 0-16.8l22.3-22.3c4.6-4.6 12.1-4.6 16.8 0l61.4 61.4 61.4-61.4c4.6-4.6 12.1-4.6 16.8 0l22.3 22.3c4.7 4.6 4.7 12.1 0 16.8z"></path></svg>
      </i>
      <i className="prev" onClick={prevFullscreen}>
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" className="svg-inline--fa fa-chevron-left fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 320 512"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg>
      </i>
      <i className="next" onClick={nextFullscreen}>
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" className="svg-inline--fa fa-chevron-right fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>
      </i>
      <canvas id="canvas" onClick={showExitIcon}></canvas>
    </div>
  )
}

export default Fullscreen
