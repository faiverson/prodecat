import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import styles from './input.module.css'

export const variation = {
  PRIMARY: 'input-primary',
  SECONDARY: 'input-secondary',
}

const Input = ({variation, name, type, error, value, label, placeholder, autoComplete, onChange}) => {
  const [text, setText] = useState(placeholder)
  const id = [name, 'fc-input'].join('-')


  const onFocus = () => label && !error && setText(label)

  const onBlur = () => value === '' && !error && setText(placeholder)

  let inputProps = {
    id,
    className: classNames(!!error ? styles.error : styles[variation], {[styles.dirty]: value !== ''}),
    name,
    autoComplete,
    type,
    onChange,
    onFocus,
    onBlur,
    value: value ?? ''
  }

  // useEffect(() => {
  //   if(!!validation?.error) {
  //     // variation = variations.ERROR
  //     switch(validation.error.type) {
  //       case 'required':
  //         setText(!!label ? `${label} is required` : `Required`)
  //         break
  //       default:
  //         setText(validation.error.message)
  //         break
  //     }
  //   } else {
  //     setText(label ?? placeholder)
  //   }
  // }, [validation])

  return (
    <>
      <div className="relative w-full">
        <input {...inputProps} />
        <label htmlFor={id} className={classNames(styles['input-label-box'], !!error ? styles.error : styles.variation)}>{text}</label>
      </div>
    </>
  )
}

Input.defaultProps = {
  name: '',
  variation: variation.PRIMARY,
  type: 'text',
  value: '',
  error: null,
  required: false,
  autoComplete: 'no',
  label: '',
  placeholder: '',
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  variation: PropTypes.oneOf(Object.values(variation)),
  value: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  autoComplete: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
}

export { Input }
