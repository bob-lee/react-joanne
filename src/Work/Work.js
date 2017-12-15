import React from 'react';
// import { Link, Route } from 'react-router-dom'
import { withObserver } from './withObserver'
import './Work.css'

class Image extends React.Component {
  state = { loaded: false }

  // constructor(props) {
  //   super(props)
  //   //this.state = { loaded: false }
  //   //this.loaded = this.loaded.bind(this)
  // }

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

const Images = (props) => (
  <div className="images">
    {props.list.map((item, index) =>
      <Image key={item.fileName}
        item={item}
        index={index}
        {...props} />
    )}
  </div>
)

const ImagesWithObserver = withObserver(Images)

export default ImagesWithObserver

/*
    const Work = ({ match }) => (
      <div>
        {match.params.name}
      </div>
    )
<Route path={match.url + '/portrait'} component={Portrait}/>
<Route path={match.url + '/painting'} component={Painting}/>
<Route path={match.url + '/illustration'} component={Illustration}/>

const Portrait = () => {
  <div> work/portrait </div>
}

const Painting = () => {
  <div> work/painting </div>
}

const Illustration = () => {
  <div> work/illustration </div>
}
*/