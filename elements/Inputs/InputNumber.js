import React, { useState } from 'react'
import PropTypes from 'prop-types'

const InputNumber = ({name, type, value, required, label, placeholder, autoComplete, onChange}) => {
  const [text, setText] = useState(placeholder)
  const id = [name, 'fc-input-number'].join('-')

  const onFocus = () => label && !error && setText(label)

  const onBlur = () => value === '' && !error && setText(placeholder)

  return (
    <>
      <div className="relative w-10">
        <input className="input-number"
                type={type}
                autoComplete={autoComplete}
                id={id}
                name={name}
                value={value}
                required={required}
                onChange={ event => onChange(event.target.value) }
                onFocus={onFocus}
                onBlur={onBlur} />
        <label htmlFor={id} className="input-number-label-box">{text}</label>
      </div>
    </>
  )
}

InputNumber.defaultProps = {
  name: '',
  type: 'text',
  value: '',
  required: false,
  autoComplete: 'no',
  label: '',
  placeholder: '',
};

InputNumber.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export { InputNumber }
