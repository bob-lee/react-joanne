import React from 'react';
import Observer from './Observer'

export default function withObserver(WrappedComponent) {
  return class extends Observer {
    render() {
      return (
        <WrappedComponent 
          list={this.state.list}
          onImageLoaded={this.observe}
          {...this.props} />
      )
    }
  }
}
