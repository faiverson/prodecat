import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

export const variations = {
  'PRIMARY': 'input-primary',
  'SECONDARY': 'input-secondary',
  'ERROR': 'input-error',
}

const Input = ({name, validation, variation, type, defaultValue, value, label, placeholder, autoComplete, onChange}) => {
  const [text, setText] = useState(placeholder)
  const id = [name, 'fc-input'].join('-')

  const onFocus = () => {
    if(label && !validation?.error) {
      setText(label)
    }
  }

  const onBlur = () => {
    if(value === '' && !validation?.error) {
      setText(placeholder)
    }
  }

  let inputProps = {
    id,
    className: classNames(!!validation?.error ? variations.ERROR : variation, {dirty: value !== ''}),
    name,
    autoComplete,
    type,
    onFocus,
    onBlur,
  }

  if(!!validation) {
    inputProps.ref = validation?.register
    inputProps.defaultValue = defaultValue ?? ''
  } else {
    inputProps.onChange = event => onChange(event.target.value)
    inputProps.value = value ?? ''
  }

  useEffect(() => {
    if(!!validation?.error) {
      variation = variations.ERROR
      switch(validation.error.type) {
        case 'required':
          setText(!!label ? `${label} is required` : `Required`)
          break
        default:
          setText(validation.error.message)
          break
      }
    } else {
      setText(label ?? placeholder)
    }
  }, [validation])

  return (
    <>
      <div className="relative w-full">
        <input {...inputProps} />
        <label htmlFor={id} className={classNames('input-label-box', !!validation?.error ? variations.ERROR : variation)}>{text}</label>
      </div>
    </>
  )
}

Input.defaultProps = {
  name: '',
  variation: variations.PRIMARY,
  type: 'text',
  value: '',
  required: false,
  autoComplete: 'no',
  label: '',
  placeholder: '',
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  variation: PropTypes.oneOf(Object.values(variations)),
  validation: PropTypes.shape({
    register: PropTypes.func.isRequired,
    error: PropTypes.shape({
      message: PropTypes.string,
      type: PropTypes.string,
    }),
  }),
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
}

export { Input }
