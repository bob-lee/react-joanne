import React from 'react';
import Observer from './Observer'

export default function withObserver(WrappedComponent) {
  return class extends Observer {
    render() {
      // const { urls, ...props } = this.props 
      // console.log('withObserver props', props, 'urls', urls && urls.length)
      return (
        <WrappedComponent 
          list={this.state.list}
          onImageLoaded={this.observe}
          {...this.props} />
      )
    }
  }
}
