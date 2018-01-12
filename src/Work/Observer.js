import React from 'react';
import getUrls from './api'

const INTERSECT_PAGESIZE = 2;

export default class Observer extends React.Component {
  state = { list: [] }
  intersectionRatio = null; // 1: fully shown, 0.5: half shown, ..
  elementToObserve = null; // img tag being obseved
  _indexToObserve = null; // index of img tag being obseved
  intersectionObserver = null; // instance of observer

  constructor(props) {
    super(props)

    try {
      this.intersectionObserver = typeof window !== 'undefined' && new IntersectionObserver(entries => {
        const entry = entries[0]; // observe one element
        const currentRatio = this.intersectionRatio;
        const newRatio = entry.intersectionRatio;
        const boundingClientRect = entry.boundingClientRect;
        const scrollingDown = currentRatio !== undefined && newRatio < currentRatio &&
          boundingClientRect.bottom < boundingClientRect.height;

        this.intersectionRatio = newRatio;

        if (scrollingDown) {
          // it's scrolling down and observed image started to hide.
          // so unobserve it and start loading next images.
          const i = this.indexToObserve + INTERSECT_PAGESIZE;
          this.unobserve();
          this.indexToObserve = i; // set next index and load two more images
          console.info(currentRatio + ' -> ' + newRatio + ' [' + i + ']');
        }

        console.log(entry);
      }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
    } catch (e) {
      console.error('failed to create IntersectionObserver:', e);
    }

  }

  get indexToObserve() {
    return this._indexToObserve
  }
  set indexToObserve(value) {
    const len = this.state.list.length;
    const newList = [...this.state.list]

    if (this._indexToObserve &&
      (!value || value <= this._indexToObserve || value >= len)) {
      console.error('indexToObserve', value)
      return
    }

    this._indexToObserve = value;

    // load more images
    let countToLoad = 0
    for (let i = 0; i < INTERSECT_PAGESIZE; i++) {
      const index = this._indexToObserve + i;
      if (index === len) {
        break // reached page end 
      }

      newList[index].toLoad = true
      countToLoad++
      console.log('[' + index + ']');
    }

    if (countToLoad) {
      this.setState({ list: newList })
    }
  }

  getUrls(path) {
    //this.unobserve()
    return getUrls(path)
      .then(items => {
        const itemsWithToLoad = items.map((item, index) => (
          { toLoad: index < 2, ...item }
        ))
        console.log('itemsWithToLoad:', itemsWithToLoad)
        this._indexToObserve = 0
        this.setState({ list: itemsWithToLoad })

        //window.scrollTo(0, 0)
      })
  }

  componentWillUnmount() {
    console.warn('Observer componentWillUnmount')
    this.unobserve()
  }

  componentWillReceiveProps(nextProps) {
    const path = this.props.match.params.name
    const nextPath = nextProps.match.params.name
    if (path !== nextPath) {
      console.warn(`Work componentWillReceiveProps '${path}' -> '${nextPath}'`)
      this.unobserve()
      this.getUrls(nextPath)
    }
  }

  componentDidMount() {
    const path = this.props.match.params.name
    console.warn(`Observer componentDidMount '${path}'`)
    this.getUrls(path)
  }

  observe = me => {
    console.log(me)
    if (!me || !me.element || me.index === undefined) {
      console.warn(`observe() invalid input: ${me}`);
      return;
    }

    if (me.index === this.indexToObserve) {
      this.elementToObserve = me.element;
      this.intersectionObserver.observe(me.element);
      console.info(`elementToObserve = ${me.index}`);
    } else {
      console.log(`observe(${me.index} !== ${this.indexToObserve})`);
    }
  }

  unobserve = () => { // unobserve current element
    if (this.elementToObserve) {
      this.intersectionObserver.unobserve(this.elementToObserve);
      this.intersectionRatio = undefined;
      console.info(`unobserve [${this.indexToObserve}]`);
    } else {
      console.log(`null elementToObserve`);
    }
  }

  render() {
    return (
      <div
        //list={this.state.list}
        //onImageLoaded={this.observe}
        //{...props}
        //{...this.props} 
        />
    )
  }
}
/*
        <ErrorBoundary>
          <WrappedComponent
            list={this.state.list}
            onImageLoaded={this.observe}
            {...this.props} />
        </ErrorBoundary>

*/