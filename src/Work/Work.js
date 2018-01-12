import withObserver from './withObserver'
import Images from './Images'
if (typeof window !== 'undefined') {
  require('./intersection-observer')
  require('./Work.css')
}

const ImagesWithObserver = withObserver(Images)

export default ImagesWithObserver