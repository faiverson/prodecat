import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'

export const variations = {
  'PRIMARY': 'input-primary',
  'ERROR': 'input-error',
}

const Password = ({name, validation, variation, defaultValue, value, label, placeholder, autoComplete, onChange}) => {
  const [text, setText] = useState(placeholder)
  const [show, setShow] = useState(false)
  const id = [name, 'fc-input-password'].join('-')

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
    type: show ? 'text' : 'password',
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
        <button className="outline-none" type="button" onClick={() => setShow(!show)}>{show ? <BsFillEyeFill /> : <BsFillEyeSlashFill/>}</button>
        <label htmlFor={id} className={classNames('input-label-box', !!validation?.error ? variations.ERROR : variation)}>{text}</label>
      </div>
    </>
  )
}

Password.defaultProps = {
  name: '',
  variation: variations.PRIMARY,
  value: '',
  defaultValue: '',
  required: true,
  autoComplete: 'no',
  label: '',
  placeholder: '',
};

Password.propTypes = {
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
  autoComplete: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
}

export { Password }
