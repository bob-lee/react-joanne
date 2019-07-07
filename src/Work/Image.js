import React, { useState } from 'react'
import Loader from './Loader'

const Image = ({index, item, imagesOnLoad, imagesOnClick}) => {
  const [loaded, setLoaded] = useState(false)

  let imgElement = null
  const handleLoad = (e) => {
    setLoaded(true)
    imagesOnLoad(e.type, {
      element: imgElement,
      index
    })
  }
  const handleClick = (e) => {
    e.preventDefault()
    imagesOnClick(e.type, {
      element: imgElement,
      index
    })
  }

  const classes = loaded ? 'image show' : 'image'
  
  const style = { margin: '0 auto' }
  const loading = (item.toLoad && !loaded) ? <Loader style={style} /> : null

  const thumbUrl = item.toLoad && item.thumbUrl
  const thumbImage = thumbUrl ? <img src={thumbUrl} className="image2" alt="thumb" /> : null

  return (
    <div>
      {loading}
      <div className={classes}>
        <a href={'#' + item.fileName} aria-hidden="true" className="anchor" onClick={handleClick}>
        <picture>
          <img src={item.toLoad ? item.url : undefined}
            onLoad={handleLoad}
            className="image1"
            ref={(el) => { imgElement = el; }}
            title="image"
            alt={item.fileName} />
        </picture>
        </a>

        <div className="expand">
          <span>{item.text}</span>
          {thumbImage}
        </div>
      </div>
    </div>
  )
}

export default Image
