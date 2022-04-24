import React from 'react'

function InputSchool(props) {
  return (props.trigger) ? (
    <input type="text" placeholder="Institución educativa"/>
  ) : "";
}

export default InputSchool