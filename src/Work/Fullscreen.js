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

  return (
    <div id="fullscreen" className={classString}>
      <canvas id="canvas" onClick={showExitIcon}></canvas>
    </div>
  )
}

export default Fullscreen
