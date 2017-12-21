import React from 'react';
import Image from './Image'

const Images = (props) => {
  const { list, ...propsButList } = props
  return (
    <div className="images">
      {props.list.map((item, index) =>
        <Image key={item.fileName}
          item={item}
          index={index}
          {...propsButList} />
      )}
    </div>
  )
}

export default Images