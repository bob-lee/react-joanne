import React from 'react'
import Loader from './Loader'

export default class Image extends React.Component {
  state = { loaded: false }

  loaded = () => {
    //console.log('loaded')
    this.setState({ loaded: true })
    this.props.onImageLoaded({
      element: this.imgElement,
      index: this.props.index
    })
  }

  render() {
    const item = this.props.item
    let classes = 'image'
    if (this.state.loaded) {
      classes += ' show'
    } 
    
    const style = { margin: '0 auto' }
    const loading = (item.toLoad && !this.state.loaded) ? <Loader style={style} /> : null

    let thumbImage = null
    const thumbUrl = item.toLoad && item.thumbUrl
    if (thumbUrl) {
      thumbImage = <img src={thumbUrl}
        className="image2"
        alt="thumb" />
    }

    return (
      <div>
        {loading}
        <div className={classes}>
          <picture>
            <img src={item.toLoad ? item.url : undefined}
              onLoad={this.loaded}
              className="image1"
              ref={(el) => { this.imgElement = el; }}
              alt={item.fileName} />
          </picture>

          <div className="expand">
            <span>{item.text}</span>
            {thumbImage}
          </div>
        </div>
      </div>
    )
  }
}
