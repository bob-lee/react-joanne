import React from 'react'

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
    const classes = `image ${this.state.loaded ? 'show' : ''}`
    //console.log(item, classes)
    let thumbImage = null
    const thumbUrl = item.toLoad && item.thumbUrl
    if (thumbUrl) {
      thumbImage = <img src={thumbUrl}
        className="image2"
        alt="thumb" />
    }

    return (
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
    )
  }
}
