
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Checkbox = ({name, value, text, checked}) => {
  const id = [name, 'fc-checkbox'].join('-');
  const [isCheck, setIsCheck] = useState(checked)

  return (
    <>
    <div className="checkbox-block">
      <input id={id} type="checkbox" className="checkbox-effect" value={value} />
      <label htmlFor={id}>{text}</label>
    </div>
    </>
  )
}

Checkbox.defaultProps = {
  required: false,
  value: '1',
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  text: PropTypes.string.isRequired,
}

export { Checkbox }
