import React, { useEffect, useState } from 'react'
if (typeof window !== 'undefined') {
  require('./Fullscreen.css')
}

const Fullscreen = ({img, toShow, onExit, onPrev, onNext}) => {
  const [fileName, setFileName] = useState('')

  useEffect(() => {
    const drawImage = (img) => {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      const scaled = getFullscreenSize(img.naturalWidth, img.naturalHeight)
  
      canvas.width = scaled.width
      canvas.height = scaled.height
      ctx.drawImage(img, 0, 0, scaled.width, scaled.height)
      // ctx.drawImage(img, 0, 0, sWidth, sHeight, 0, 0, scaled.width, scaled.height)
    }
  
    const getFullscreenSize = (sWidth, sHeight) => {
      const cWidth = document.documentElement.clientWidth
      const cHeight = document.documentElement.clientHeight
      console.log(`source(${sWidth} x ${sHeight})`)
      console.log(`client(${cWidth} x ${cHeight})`)
  
      let scaledWidth = scale(sWidth, sHeight, cWidth, cHeight, true)
      let scaledHeight = scale(sWidth, sHeight, cWidth, cHeight, false)
  
      let preferedScaled = scaledHeight
      let preferredWidth = false
      if (Math.abs(scaledWidth.overflow) < Math.abs(scaledHeight.overflow)) {
        preferedScaled = scaledWidth
        preferredWidth = true
      }
  
      console.log(`scaled once`, preferredWidth)
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
        console.log(`scaled twice`, preferredWidth)
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
  
    const logScale = (scaled, scaleWidth) => console.log(`scaled${scaleWidth ? 'Width' : 'Height'}(${scaled.width} x ${scaled.height})`, scaled.overflow)
  
    if (img) {
      if (!fileName || fileName !== img.alt) {
        drawImage(img)
        setFileName(img.alt)
      }
    }

    console.log('Fulscreen', img && img.alt)
  }, [img])

  const classes = toShow ? 'show' : ''

  return(
    <div id="fullscreen" className={classes}>
      <i className="exit" onClick={onExit}>
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" className="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
      </i>
      <i className="prev" onClick={onPrev}>
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" className="svg-inline--fa fa-chevron-left fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 320 512"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg>
      </i>
      <i className="next" onClick={onNext}>
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" className="svg-inline--fa fa-chevron-right fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>
      </i>
      <canvas id="canvas"></canvas>
    </div>
  )
}

export default Fullscreen
