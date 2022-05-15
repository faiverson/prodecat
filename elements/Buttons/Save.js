import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FaSave, FaCheckCircle } from 'react-icons/fa'
// import { CSSTransition, SwitchTransition } from 'react-transition-group';

const SaveButton = ({ text, onClick }) => {
  const states = {
    START: 'start',
    HOVER: 'hover',
    FINISH: 'finish',
  }

  const [state, setState] = useState(states.START)

  const submit = () => {
    onClick()
  }

  const duration = 300;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  }

  const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
  };

  return (
      // <CSSTransition
      //           key="my-transition"
      //           timeout={800}
      //           classNames="button-icon"
      //         >
      <button type="text" className="btn-save btn-primary" onClick={submit}>
        <div className="icon" onMouseOver={() => setState(states.HOVER)} onMouseOut={() => setState(states.START)}>
          {
            {
              start: <FaSave className="save" />,
              finish: <FaCheckCircle className="confirm"/>
            }[state]
          }
        </div>
        <span>{text}</span>
      </button>
      // </CSSTransition>
  )
}

SaveButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export { SaveButton }
